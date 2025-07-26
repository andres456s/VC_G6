import cv2
import torch
from torchvision import transforms
import timm

# ==== CONFIGURACIÓN ====
model_path = 'best_model_TIV_fold4.pth'  # Cambia por el fold/modelo que prefieras
model_name = 'vit_base_patch16_224'      # Debe coincidir con el que entrenaste
num_classes = 6
class_names = ['cardboard', 'glass', 'metal', 'paper', 'plastic', 'trash']

preprocess = transforms.Compose([
    transforms.ToPILImage(),
    transforms.Resize((224,224)),
    transforms.ToTensor(),
    transforms.Normalize([0.5]*3, [0.5]*3)
])

device = torch.device('cuda' if torch.cuda.is_available() else 'cpu')
model = timm.create_model(model_name, pretrained=False, num_classes=num_classes)
model.load_state_dict(torch.load(model_path, map_location=device))
model.eval()
model.to(device)

cap = cv2.VideoCapture(0)
while True:
    ret, frame = cap.read()
    if not ret:
        break
    input_tensor = preprocess(frame).unsqueeze(0).to(device)
    with torch.no_grad():
        output = model(input_tensor)
        probs = torch.softmax(output, dim=1)[0]
        top2 = torch.topk(probs, 2)
        idx1, idx2 = top2.indices[0].item(), top2.indices[1].item()
        prob1, prob2 = top2.values[0].item(), top2.values[1].item()
        label1 = f"{class_names[idx1]}: {prob1*100:.1f}%"
        label2 = f"{class_names[idx2]}: {prob2*100:.1f}%"
        cv2.putText(frame, label1, (10,30), cv2.FONT_HERSHEY_SIMPLEX, 1, (0,255,0), 2)
        cv2.putText(frame, label2, (10,60), cv2.FONT_HERSHEY_SIMPLEX, 1, (0,255,255), 2)
    cv2.imshow('Webcam', frame)
    if cv2.waitKey(1) == ord('q'):
        break
cap.release()
cv2.destroyAllWindows()