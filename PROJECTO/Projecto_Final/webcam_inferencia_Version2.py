import cv2
import torch
import torch.nn as nn
from torchvision import transforms
import timm

# ==== Clase del modelo CNN+RESNET ====
class HybridCNNResNet(nn.Module):
    def __init__(self, num_classes):
        super().__init__()
        IMG_SIZE = 224
        target_size = (IMG_SIZE, IMG_SIZE)
        self.cnn_branch = nn.Sequential(
            nn.ZeroPad2d(1),
            nn.Conv2d(3, 32, kernel_size=3),
            nn.ReLU(),
            nn.Dropout(0.3),
            nn.MaxPool2d(2),
            nn.Conv2d(32, 64, kernel_size=3),
            nn.ReLU(),
            nn.Dropout(0.3),
            nn.MaxPool2d(2),
            nn.Conv2d(64, 128, kernel_size=3),
            nn.ReLU(),
            nn.Dropout(0.4),
            nn.MaxPool2d(2),
        )
        self.resnet_branch = timm.create_model('resnet50', pretrained=True, num_classes=num_classes)
        self.resnet_features = nn.Sequential(*list(self.resnet_branch.children())[:-2])
        self.resnet_pool = nn.AdaptiveAvgPool2d((1, 1))

        with torch.no_grad():
            dummy = torch.zeros(1, 3, target_size[0], target_size[1])
            cnn_feat = self.cnn_branch(dummy)
            cnn_feat_flat = cnn_feat.view(1, -1)
            cnn_size = cnn_feat_flat.size(1)
            resnet_feat = self.resnet_features(dummy)
            resnet_feat = self.resnet_pool(resnet_feat)
            resnet_feat_flat = resnet_feat.view(1, -1)
            resnet_size = resnet_feat_flat.size(1)
            fusion_size = cnn_size + resnet_size

        self.classifier = nn.Sequential(
            nn.Linear(fusion_size, 128),
            nn.ReLU(),
            nn.Dropout(0.5),
            nn.Linear(128, 64),
            nn.ReLU(),
            nn.Linear(64, num_classes)
        )

    def forward(self, x):
        cnn_out = self.cnn_branch(x)
        cnn_out = cnn_out.view(x.size(0), -1)
        resnet_out = self.resnet_features(x)
        resnet_out = self.resnet_pool(resnet_out)
        resnet_out = resnet_out.view(x.size(0), -1)
        fusion = torch.cat([cnn_out, resnet_out], dim=1)
        out = self.classifier(fusion)
        return out

# ==== Parámetros ====
model_path = 'best_model_fold_CNN+RESTNET5.pth'
num_classes = 6
class_names = ['cardboard', 'glass', 'metal', 'paper', 'plastic', 'trash']

preprocess = transforms.Compose([
    transforms.ToPILImage(),
    transforms.Resize((224,224)),
    transforms.ToTensor(),
    transforms.Normalize([0.5]*3, [0.5]*3)
])

device = torch.device('cuda' if torch.cuda.is_available() else 'cpu')
model = HybridCNNResNet(num_classes)
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