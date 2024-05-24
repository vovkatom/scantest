import { useEffect, useRef } from 'react';
import Quagga from 'quagga';

const CameraScannerForm = () => {
  const videoRef = useRef(null);

  useEffect(() => {
    const enableCamera = async () => {
      try {
        const constraints = { video: true };
        const stream = await navigator.mediaDevices.getUserMedia(constraints);
        videoRef.current.srcObject = stream;
      } catch (error) {
        console.error('Error accessing camera:', error);
      }
    };

    const initializeScanner = () => {
      Quagga.init({
        inputStream: {
          name: 'Live',
          type: 'LiveStream',
          target: videoRef.current,
        },
        decoder: {
          readers: ['code_128_reader', 'ean_reader', 'upc_reader', 'code_39_reader'],
        },
      }, function(err) {
        if (err) {
          console.error('Error initializing Quagga:', err);
          return;
        }
        Quagga.start();
      });

      Quagga.onDetected(detected);
    };

    const detected = result => {
      console.log('Barcode detected:', result);
      console.log('Barcode type:', result.codeResult.format); // Вивести тип штрих-коду
      console.log('Barcode data:', result.codeResult.code); // Вивести сам штрих-код
      // Do something with the detected barcode data
    };

    enableCamera();
    initializeScanner();

    return () => {
      Quagga.stop();
      if (videoRef.current.srcObject) {
        const stream = videoRef.current.srcObject;
        const tracks = stream.getTracks();
        tracks.forEach(track => track.stop());
      }
    };
  }, []);

  return (
    <div>
      <video ref={videoRef} autoPlay playsInline style={{ width: '100%', height: 'auto' }} />
    </div>
  );
};

export default CameraScannerForm;
