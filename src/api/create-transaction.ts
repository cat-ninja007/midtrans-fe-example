import axios from "axios";
import type { NextApiRequest, NextApiResponse } from "next";

interface TransactionResponse {
  success: boolean;
  message: string;
  data?: unknown;
}

export default async function handler(
  req: NextApiRequest, 
  res: NextApiResponse
) {
  if(req.method === "POST"){
    try{
      const response = await axios.post<TransactionResponse>(
        'http://localhost:8080/api/create-transaction'
      );
      res.status(200).json(response.data);
    } catch(error){
      if(axios.isAxiosError(error)){
        res.status(500).json({ success: false, message: error.message });
      } else {
        res.status(500).json({ success: false, message: 'An unexpected error occured'});
      }
    }
  } else {
    res.setHeader('Allow', ['POST']);
    res.status(405).json({ success: false, message: `Method ${req.method} Not Allowed`})
  }
}