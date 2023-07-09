
 const router = require('express').Router();
const stripe = require('stripe')("sk_test_51MeOYDABpRc42fS3JqUc8NArklioPhv7OJqiqfd7aQ0Db2DaSS7O0t13bc1aBvuWlPHjZXotd3qXSDMTT3hdtaFr00aHyzBalw")
router.post('/token', async (req, res) => {
    const { amount, currency, source } = req.body;
  
    try {
      const paymentIntent = await stripe.paymentIntents.create({
        amount,
        currency,
        source,
      });
  
      res.status(200).json({ clientSecret: paymentIntent.client_secret });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'An error occurred while processing the payment' });
    }
  });

  


router.post('/payment',(req,res)=>{
    stripe.charges.create(
        {source:req.body.tokenId,amount:req.body.amount,currency:"usd"},
    ( stripeErr,stripeRes)=>{
    if(stripeErr){
        res.status(500).json(stripeErr)
    }else{
        res.status(200).json(stripeRes)
    }

    })
})
 module.exports=router