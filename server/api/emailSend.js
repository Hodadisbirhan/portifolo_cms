export const emailSend = async (input)=>{
const {email,subject,value} = input;
    const options = {
        method: "POST",
        headers: {
          "content-type": "application/json",
          "X-RapidAPI-Key": process.env.RAPID_API_KEY,
          "X-RapidAPI-Host": process.env.RAPID_API_HOST,
        },
        body: {
          personalizations: [
            { to: [{ email: email }], subject: subject },
          ],
          from: { email: "hodadisbirhan80@gmail.com" },
          content: [{ type: "text/plain", value:value }],
        },
      };
try{
      const data = await $fetch(
        "https://rapidprod-sendgrid-v1.p.rapidapi.com/mail/send",
        options
      );

      return {status:"success"}

}
catch(e)
{
    
return {status:'failure'};

}

}