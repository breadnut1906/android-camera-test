import { AfterViewInit, Component, ElementRef, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { IonicUiComponentsModule } from 'src/app/modules/ionic-ui-components/ionic-ui-components.module';
import * as faceDetection from '@tensorflow-models/face-detection';

@Component({
  selector: 'app-face-detection',
  templateUrl: './face-detection.page.html',
  styleUrls: ['./face-detection.page.scss'],
  standalone: true,
  imports: [ IonicUiComponentsModule ]
})
export class FaceDetectionPage implements OnInit, AfterViewInit, OnDestroy {

  @ViewChild('videoElement') videoElement!: ElementRef<HTMLVideoElement>;
  @ViewChild('canvasElement') canvasElement!: ElementRef<HTMLCanvasElement>;
  model: any;
  detectionInterval: any;

  async ngOnInit() {
    await this.loadModel();
    await this.startCamera();
  }

  async ngAfterViewInit(): Promise<void> { }

  async loadModel() {
    // this.model = await faceDetection.load(faceDetection.SupportedPackages.mediapipeFacemesh);
    const model = faceDetection.SupportedModels.MediaPipeFaceDetector;
    this.model = await faceDetection.createDetector(model, { runtime: 'mediapipe', maxFaces: 1 });
  }

  async startCamera() {
    const video = this.videoElement.nativeElement;

    if (navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
      const stream = await navigator.mediaDevices.getUserMedia({ video: true });
      video.srcObject = stream;

      video.onloadedmetadata = () => {
        video.play();
        this.startFaceDetection();
      };
    } else {
      console.error('Camera not accessible');
    }
  }

  async startFaceDetection() {
    const canvas = this.canvasElement.nativeElement;
    const context: any = canvas.getContext('2d');

    // Set canvas dimensions
    canvas.width = this.videoElement.nativeElement.videoWidth;
    canvas.height = this.videoElement.nativeElement.videoHeight;

    this.detectionInterval = setInterval(async () => {
      context.clearRect(0, 0, canvas.width, canvas.height);
      context.drawImage(this.videoElement.nativeElement, 0, 0, canvas.width, canvas.height);

      const predictions = await this.model.estimateFaces({
        input: this.videoElement.nativeElement,
        flipHorizontal: false,
      });

      this.drawFaceBoxes(predictions, context);
    }, 100); // Detect faces every 100ms
  }

  drawFaceBoxes(predictions: any[], context: CanvasRenderingContext2D | null) {
    if (!context) return;

    predictions.forEach(prediction => {
      const keypoints = prediction.scaledMesh;

      // Draw face bounding box
      context.beginPath();
      context.rect(
        prediction.boundingBox.topLeft[0],
        prediction.boundingBox.topLeft[1],
        prediction.boundingBox.bottomRight[0] - prediction.boundingBox.topLeft[0],
        prediction.boundingBox.bottomRight[1] - prediction.boundingBox.topLeft[1]
      );
      context.lineWidth = 2;
      context.strokeStyle = 'red';
      context.stroke();

      // Optionally draw keypoints
      keypoints.forEach((point: any) => {
        context.fillStyle = 'blue';
        context.fillRect(point[0], point[1], 2, 2);
      });
    });
  }

  ngOnDestroy() {
    if (this.detectionInterval) {
      clearInterval(this.detectionInterval);
    }
  }
}
