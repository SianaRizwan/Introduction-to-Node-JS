//Synchronous & asynchronous function
// Synchronous function if line 1 faces an error then rest of the lines won't be executed
// Asynchronous function - line 3 (containing an async function) will continue to run parallely with line 4 & 5 (which are not async fn)
//sync fn needs 2 parameters. async needs 3 including callback fn (handling errors)
//Here line 1,3 ,4 , 5 are imaginary

// write,append,delete,rename 

const fs = require("fs");

// fs.writeFile("./contents/demoFile.txt", "We are learning NodeJS",(err)=>{
//     if(err){
//         console.log(err);
//     }
//     else
//     {
// console.log("Write successfull");
//     }
// });

// fs.writeFileSync("./contents/demoFile.txt", "We are learning NodeJS! ");
// fs.appendFileSync("./contents/demoFile.txt", "We are learning Java");

// fs.rename("./contents/demoFile.txt", "./contents/RenamedFile.txt", (err) => {
//         if (err) {
//             console.log(err);
//         } else {
//             console.log("Rename Successful");
//         }
//     });

// fs.readFile("./contents/RenamedFile.txt", "utf-8", (err, data) => {
//             if (err) {
//                 console.log(err);
//             } else {
//                 console.log(data);
//             }
//         });


console.log("Before");
fs.readFile("./contents/RenamedFile.txt", "utf-8", (err, data) => {
    if (err) {
        console.log(err);
    } else {
        fs.appendFile("./contents/RenamedFile.txt", "Is this a Synchronous Process?", (err) => {
        });
        fs.readFile("./contents/RenamedFile.txt", "utf-8", (err, data) => {
            if (err) {
                console.log(err);
            } else {
                console.log(data);
            }
        })
    }
});
console.log("After");

fs.unlink("./contents/RenamedFile.txt", (err) => {
    if (!err) console.log("Deleted Successfully.");
});