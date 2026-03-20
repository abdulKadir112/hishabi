export async function POST(req) {
    const formData = await req.formData();
  
    const data = {
      type: formData.get('type'),
      amount: formData.get('amount'),
      note: formData.get('note'),
      donorName: formData.get('donorName'),
      donorPhone: formData.get('donorPhone'),
      donorAddress: formData.get('donorAddress'),
      receiverName: formData.get('receiverName'),
      receiverPhone: formData.get('receiverPhone'),
      receiverAddress: formData.get('receiverAddress'),
    };
  
    console.log("Received:", data);
  
    return Response.json({
      success: true,
      data,
    });
  }