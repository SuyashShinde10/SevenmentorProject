function calculateTotal(price, tax) {
   // Bug 1: 'discount' define nahi hai
   const total = price + tax - discount; 

   // Bug 2: infinite loop ka risk
   while(total > 0) {
      console.log("Processing...");
   }

   return total;
}
