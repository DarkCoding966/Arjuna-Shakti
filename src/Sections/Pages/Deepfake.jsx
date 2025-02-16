import { useState } from 'react';
import { toast } from 'react-hot-toast';
import { GoogleGenerativeAI } from "@google/generative-ai";
import { Container, Typography, Button, Box, Paper, Card, CardContent, CircularProgress, Alert, LinearProgress } from '@mui/material';
import { Upload } from 'lucide-react';

const geminiApiKey = "AIzaSyChz49v4j96SIOqL3_kAbWi6RJgTyuzIfI";

const DeepfakeDetection = () => {
  const [file, setFile] = useState(null);
  const [preview, setPreview] = useState(null);
  const [verificationStatus, setVerificationStatus] = useState('idle');
  const [verificationResult, setVerificationResult] = useState(null);

  const handleFileChange = (e) => {
    if (e.target.files[0]) {
      const reader = new FileReader();
      reader.onload = (e) => setPreview(e.target.result);
      reader.readAsDataURL(e.target.files[0]);
      setFile(e.target.files[0]);
    }
  };

  const handleVerify = async () => {
    if (!file) return;
    setVerificationStatus('verifying');
    try {
      const genAI = new GoogleGenerativeAI(geminiApiKey);
      const model = genAI.getGenerativeModel({ model: 'gemini-1.5-flash' });

      const base64Data = await new Promise((res, rej) => {
        const reader = new FileReader();
        reader.onload = () => res(reader.result.split(',')[1]);
        reader.onerror = rej;
        reader.readAsDataURL(file);
      });

      const prompt = `Analyze this image and determine if it is a deepfake. Provide a confidence score and whether it is authentic or manipulated. Response format: {"deepfake": true/false, "confidence": "percentage"}`;

      const result = await model.generateContent([prompt, { inlineData: { data: base64Data, mimeType: file.type } }]);
      const rawResponse = await result.response.text();
      const cleanedResponse = rawResponse.replace(/```json\n|\n```/g, '').trim();
      const parsedResult = JSON.parse(cleanedResponse);

      if (parsedResult && parsedResult.deepfake !== undefined) {
        setVerificationResult(parsedResult);
        setVerificationStatus('success');
      } else {
        toast.error('Failed to determine deepfake status.');
        setVerificationStatus('failure');
      }
    } catch (error) {
      console.error(error);
      toast.error('Error verifying the image.');
      setVerificationStatus('failure');
    }
  };

  return (
    <Container maxWidth="md" sx={{ p: 4, backgroundColor: '#eef2f3', borderRadius: '12px', mt: 4 }}>
      <Typography variant="h4" gutterBottom align="center" sx={{ color: '#2d3e50', fontWeight: 'bold' }}>
        Deepfake Detection
      </Typography>

      <Paper elevation={4} sx={{ p: 4, borderRadius: '12px', backgroundColor: '#f9fafb' }}>
        <Box mb={3}>
          <Typography variant="h6" sx={{ mb: 2 }}>Upload Image</Typography>
          <Button component="label" variant="outlined" startIcon={<Upload />} fullWidth>
            Upload File
            <input type="file" hidden onChange={handleFileChange} accept="image/*" />
          </Button>
        </Box>

        {preview && (
          <Box mb={3} textAlign="center">
            <img src={preview} alt="Preview" style={{ maxWidth: '100%', borderRadius: '12px' }} />
          </Box>
        )}

        <Button
          type="button"
          onClick={handleVerify}
          fullWidth
          variant="contained"
          color="primary"
          disabled={!file || verificationStatus === 'verifying'}
          sx={{ mb: 3 }}
        >
          {verificationStatus === 'verifying' ? (
            <>
              <CircularProgress size={20} sx={{ mr: 1, color: 'white' }} />
              Verifying...
            </>
          ) : 'Verify Image'}
        </Button>

        {verificationResult && (
          <Card sx={{ mt: 3, backgroundColor: verificationResult.deepfake ? '#ffebee' : '#e8f5e9' }}>
            <CardContent>
              <Typography
                variant="h5"
                align="center"
                sx={{ fontWeight: 'bold', color: verificationResult.deepfake ? 'red' : 'green' }}
              >
                {verificationResult.deepfake ? "Deepfake Detected" : "Authentic Image"}
              </Typography>

              <Typography variant="h6" align="center" sx={{ mt: 2 }}>
                Confidence Score: {verificationResult.confidence}
              </Typography>

              <Box sx={{ width: '100%', mt: 2 }}>
                <LinearProgress
                  variant="determinate"
                  value={parseFloat(verificationResult.confidence)}
                  sx={{
                    height: 10,
                    borderRadius: 5,
                    backgroundColor: '#d1d5db',
                    '& .MuiLinearProgress-bar': {
                      backgroundColor: verificationResult.deepfake ? 'red' : 'green',
                    },
                  }}
                />
              </Box>

              <Alert severity={verificationResult.deepfake ? "error" : "success"} sx={{ mt: 3 }}>
                {verificationResult.deepfake ? "This image is likely a deepfake. Be cautious when using or sharing it!" : "This image appears to be authentic."}
              </Alert>
            </CardContent>
          </Card>
        )}
      </Paper>
    </Container>
  );
};

export default DeepfakeDetection;
