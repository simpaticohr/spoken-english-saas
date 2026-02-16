import React, { useState, useEffect, useRef } from 'react';
import { Mic, MicOff, Pause, Square } from 'lucide-react';
import { formatDuration } from '../../utils/helpers';

const AudioRecorder = ({ onRecordingComplete, maxDuration = 120 }) => {
  const [isRecording, setIsRecording] = useState(false);
  const [duration, setDuration] = useState(0);
  const [audioLevel, setAudioLevel] = useState(0);
  const mediaRecorderRef = useRef(null);
  const chunksRef = useRef([]);
  const timerRef = useRef(null);
  const analyzerRef = useRef(null);

  const startRecording = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });

      // Audio analyzer for visualization
      const audioCtx = new AudioContext();
      const source = audioCtx.createMediaStreamSource(stream);
      const analyzer = audioCtx.createAnalyser();
      analyzer.fftSize = 256;
      source.connect(analyzer);
      analyzerRef.current = { audioCtx, analyzer, stream };

      // Media recorder
      const recorder = new MediaRecorder(stream);
      chunksRef.current = [];

      recorder.ondataavailable = (e) => {
        if (e.data.size > 0) chunksRef.current.push(e.data);
      };

      recorder.onstop = () => {
        const blob = new Blob(chunksRef.current, { type: 'audio/webm' });
        onRecordingComplete?.(blob);
        stream.getTracks().forEach((t) => t.stop());
        audioCtx.close();
      };

      recorder.start(100);
      mediaRecorderRef.current = recorder;
      setIsRecording(true);
      setDuration(0);

      // Timer
      timerRef.current = setInterval(() => {
        setDuration((d) => {
          if (d >= maxDuration) {
            stopRecording();
            return d;
          }
          return d + 1;
        });

        // Update audio level
        const data = new Uint8Array(analyzer.frequencyBinCount);
        analyzer.getByteFrequencyData(data);
        const avg = data.reduce((sum, val) => sum + val, 0) / data.length / 255;
        setAudioLevel(avg);
      }, 1000);
    } catch (err) {
      console.error('Failed to start recording:', err);
    }
  };

  const stopRecording = () => {
    if (mediaRecorderRef.current?.state === 'recording') {
      mediaRecorderRef.current.stop();
    }
    clearInterval(timerRef.current);
    setIsRecording(false);
    setAudioLevel(0);
  };

  useEffect(() => {
    return () => {
      clearInterval(timerRef.current);
      if (mediaRecorderRef.current?.state === 'recording') {
        mediaRecorderRef.current.stop();
      }
    };
  }, []);

  return (
    <div className="flex flex-col items-center gap-4">
      <button
        onClick={isRecording ? stopRecording : startRecording}
        className={`w-16 h-16 rounded-full flex items-center justify-center transition-all shadow-lg ${
          isRecording
            ? 'bg-red-500 text-white pulse-recording shadow-red-500/30'
            : 'bg-primary-600 text-white hover:bg-primary-700 shadow-primary-600/30'
        }`}
      >
        {isRecording ? <Square className="w-6 h-6" /> : <Mic className="w-7 h-7" />}
      </button>

      {isRecording && (
        <div className="text-center">
          <p className="text-lg font-mono font-bold text-red-600">
            {formatDuration(duration)}
          </p>
          <div className="w-32 h-2 bg-gray-200 rounded-full mt-2 overflow-hidden">
            <div
              className="h-full bg-red-500 rounded-full transition-all"
              style={{ width: `${audioLevel * 100}%` }}
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default AudioRecorder;