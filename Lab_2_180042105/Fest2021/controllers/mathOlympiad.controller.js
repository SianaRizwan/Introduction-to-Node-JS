const MathOlympiad = require('../models/mathOlympiad.model');
const sendMail=require('../utils/send_mail')
const randNumber=require('../utils/id_generator')

const getMO = (req,res) =>{
    res.render('math-olympiad/register.ejs',{error:req.flash("error")})
}

const postMO = (req,res) =>{
    const {name,category,contact,email,institution,tshirt} = req.body;
    // console.log(name)
    // console.log(category)
    // console.log(contact)
    // console.log(email)
    // console.log(institution)
    // console.log(tshirt)
    let registrationFee = 0;
    if(category=='School'){
        registrationFee= 250;
    } else if(category=='College'){
        registrationFee=400;
    } else {
        registrationFee=500;
    }

    const total=registrationFee;
    const paid = 0;
    const selected = false;

    let error = "";
    MathOlympiad.findOne({name:name,contact:contact}).then((participant)=>{
        if(participant){
            error = "Participant with this name and contact number already exists!"
            req.flash("error",error);
            res.redirect('/MathOlympiad/register');
        } else{
            const participant = new MathOlympiad({
                name,
                category,
                contact,
                email,
                institution,
                paid,
                total,
                selected,
                tshirt
            });
            participant.save().then((val)=>{
                let uniqueID = val._id;
                MathOlympiad.findOneAndUpdate(
                  { _id: uniqueID },
                  { $set: { mailId: randNumber(uniqueID) } }
                ).then(()=>
                {
                 error = "Participant has been registered successfully";
                 req.flash("error",error)
                 sendMail(email, "Math Olympiad", name, uniqueID);
                 res.redirect('/MathOlympiad/register');
                }).catch((err) => {
                  console.log("mo-register", err);
                });


            }).catch(()=>{
                error = "An unexpected error has occured! Please try again";
                req.flash("error",error)
                res.redirect('/MathOlympiad/register');
            }) 
        }
    })
    
} 
const getMOList = (req,res) =>{
    let all_participant = []
    let error = ''
    MathOlympiad.find().then((data)=>{
        all_participant = data;
        res.render('math-olympiad/list.ejs',{
            error:req.flash('error'),
            participants:all_participant,
        })
    }).catch(()=>{
            error="Failed to fetch data!"
            res.render('math-olympiad/list.ejs',{
                error:req.flash('error',error),
                participants:all_participant,
            })
    })
  
}

const deleteMO = (req,res)=>{
    const id = req.params.id;
    let error = ''
    MathOlympiad.deleteOne({_id:id},(err)=>{
        if(err){
            error = "Failed to delete data"
            req.flash('error',error)
            res.redirect('/MathOlympiad/list')
        }else{
            error = "Data has been deleted successfully"
            req.flash('error',error)
            res.redirect('/MathOlympiad/list')
        }
    })
    
}

const paymentDoneMO=(req,res)=>{
    const id = req.params.id;
    let error = ''
    MathOlympiad.findOne({_id:id}).then((participant)=>{
        //--It was woking thought for me--//
        // const total = participant.total
        // MathOlympiad.findByIdAndUpdate({_id:id},{paid:total},(err)=>{
        //         if(err){
        //             error = "Failed to update data"
        //             req.flash('error',error)
        //             res.redirect('/MathOlympiad/list')
        //         }else{
        //             error = "Payment completed"
        //             req.flash('error',error)
        //             res.redirect('/MathOlympiad/list')
        //         }
        // })
       
        participant.paid=participant.total;
        participant.save().then(()=>{
            error = "Payment completed"
            req.flash('error',error)
            res.redirect('/MathOlympiad/list')
        }).catch(()=>{
            error = "Failed to update data"
            req.flash('error',error)
            res.redirect('/MathOlympiad/list')
        })
    }).catch(()=>{
                    error = "Unexpected error occured"
                    req.flash('error',error)
                    res.redirect('/MathOlympiad/list')
    })
}


const selectMO =(req,res)=>{
    const id = req.params.id;
    let error = ''
    MathOlympiad.findOne({_id:id}).then((participant)=>{
        participant.selected=true;
        participant.save().then(()=>{
            error = "Participant has been selected"
            req.flash('error',error)
            res.redirect('/MathOlympiad/list')
        }).catch(()=>{
            error = "Failed to update data"
            req.flash('error',error)
            res.redirect('/MathOlympiad/list')
        })
    }).catch(()=>{
                    error = "Unexpected error occured"
                    req.flash('error',error)
                    res.redirect('/MathOlympiad/list')
    })
}

const getEditMO=(req,res)=>{
    const id = req.params.id;
    let info = [];
    let error = ''
    MathOlympiad.findOne({ _id: id })
      .then((data) => {
        info = data;
        res.render("math-olympiad/edit.ejs", {
          error:req.flash('error'),
          participant: info,
        });
      })
      .catch((e) => {
        error = "Failed to fetch data";
        res.render("math-olympiad/edit.ejs", {
          error: req.flash("error", error),
          participant: info,
        });
      });
}

const postEditMO= async (req,res)=>{
    const { name, contact, category, email, institution, tshirt } = req.body;
    let registrationFee = 0;
    if(category=='School'){
        registrationFee= 250;
    } else if(category=='College'){
        registrationFee=400;
    } else {
        registrationFee=500;
    }
    const total=registrationFee;
    let error = ''
    const data = await MathOlympiad.findOneAndUpdate(
      { name: name,contact:contact },
      { category, email, institution, tshirt, total }
    );
    if (data) {
        error="Participant data has been edited successfully";
        req.flash('error',error)
        res.redirect('/MathOlympiad/list')
    }
}
module.exports = {getMO,postMO,getMOList,deleteMO, paymentDoneMO,selectMO,getEditMO,postEditMO,}