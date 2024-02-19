

const {Test} = require("../../models/pi_test")
      
      
async function saveTest(){
    const piTest = new Test({
        test_date: "2024-03-14",
        test_name: "Pi Test",
        start_time: "2024-03-14 09:00:00",
        end_time: "2023-03-14 09:35:00"
    })
    await piTest.generateUniqueTestCode()
    await piTest.save()
    
  
}
saveTest()