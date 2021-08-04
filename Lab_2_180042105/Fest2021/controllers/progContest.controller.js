const ProgContest = require("../models/programmingContest.model");
const getPC = (req, res) => {
  res.render("programming-contest/register.ejs", { error: req.flash("error") });
};

const postPC = (req, res) => {
  const {
    teamName,
    institute,
    coachName,
    coachContact,
    coachEmail,
    coachTshirt,
    tleadName,
    tleadContact,
    tleadEmail,
    tleadtshirt,
    tm1Name,
    tm1Contact,
    tm1Email,
    tm1tshirt,
    tm2Name,
    tm2Contact,
    tm2Email,
    tm2tshirt,
  } = req.body;
  

  const total = 900;
  const paid = 0;
  const selected = false;
  let error = ''

  ProgContest.findOne({ teamName: teamName, institute: institute }).then(
    (team) => {
      if (team) {
        error = "Team with same name and institution exists";
        req.flash("error", error);
        res.redirect("/ProgrammingContest/register");
      } else {
        const participant = new ProgContest({
          teamName,
          institute,
          coachName,
          coachContact,
          coachEmail,
          coachTshirt,
          tleadName,
          tleadContact,
          tleadEmail,
          tleadtshirt,
          tm1Name,
          tm1Contact,
          tm1Email,
          tm1tshirt,
          tm2Name,
          tm2Contact,
          tm2Email,
          tm2tshirt,
          total,
          paid,
          selected,
        });
        participant
          .save()
          .then(() => {
            error = "Team has been registered successfully!";
            req.flash("error", error);
            res.redirect("/ProgrammingContest/register");
          })
          .catch(() => {
            error = "An unexpected error has occured! Please try again";
            req.flash("error", error);
            res.redirect("/ProgrammingContest/register");
          });
      }
    }
  );
};

const getPCList = (req, res) => {
  let all_participant = [];
  let error = ''
  ProgContest.find()
    .then((data) => {
      all_participant = data;
      res.render("programming-contest/list.ejs", {
        error: req.flash("error"),
        participants: all_participant,
      });
    })
    .catch(() => {
      error = "Failed to fetch data!";
      res.render("programming-contest/list.ejs", {
        error: req.flash("error", error),
        participants: all_participant,
      })
    })
}

const deletePC = (req, res) => {
  const id = req.params.id;
  let error = ''
  ProgContest.deleteOne({_id:id},(err)=>{
    if(err){
        error = "Failed to delete data"
        req.flash('error',error)
        res.redirect('/ProgrammingContest/list')
    }else{
        error = "Data has been deleted successfully"
        req.flash('error',error)
        res.redirect('/ProgrammingContest/list')
    }
})
  
}

const paymentDonePC = (req, res) => {
  const id = req.params.id;
  let error = ''
  ProgContest.findOne({ _id: id })
    .then((participant) => {
      participant.paid = participant.total;
      participant
        .save()
        .then(() => {
          error = "Payment completed"
          req.flash("error", error);
          res.redirect("/ProgrammingContest/list");
        })
        .catch(() => {
          error = "Failed to update data"
          req.flash("error", error);
          res.redirect("/ProgrammingContest/list");
        });
    })
    .catch(() => {
        error = "Unexpected error occured"
        req.flash('error',error)
      res.redirect("/ProgrammingContest/list");
    });
};

const getEditPC = (req, res) => {
  const id = req.params.id;
  let info = []
  let error = ''
  ProgContest.findOne({ _id: id })
    .then((data) => {
      info = data;
      res.render("programming-contest/edit.ejs", {
        error: req.flash("error"),
        participant: info,
      });
    })
    .catch((e) => {
        error = "Failed to fetch data";
      res.render("programming-contest/edit.ejs", {
        error: req.flash("error", error),
        participant: info,
      });
    });
};

const selectPC = (req, res) => {
    const id = req.params.id;
    let error = ''
    ProgContest.findOne({ _id: id })
      .then((participant) => {
        participant.selected = true;
        participant
          .save()
          .then(() => {
            error = "Participant has been selected"
            req.flash("error", error);
            res.redirect("/ProgrammingContest/list");
          })
          .catch(() => {
            error = "Failed to update data"
            req.flash("error", error);
            res.redirect("/ProgrammingContest/list");
          });
      })
      .catch(() => {
        error = "Unexpected error occured"
        req.flash("error", error);
        res.redirect("/ProgrammingContest/list");
      })
  }

const postEditPC = async (req, res) => {
  const {
    teamName,
    institute,
    coachName,
    coachContact,
    coachEmail,
    coachTshirt,
    tleadName,
    tleadContact,
    tleadEmail,
    tleadtshirt,
    tm1Name,
    tm1Contact,
    tm1Email,
    tm1tshirt,
    tm2Name,
    tm2Contact,
    tm2Email,
    tm2tshirt,
  } = req.body;
  let error = ''
  const data = await ProgContest.findOneAndUpdate(
    { teamName: teamName, institute: institute },
    { coachName,
      coachContact,
      coachEmail,
      coachTshirt,
      tleadName,
      tleadContact,
      tleadEmail,
      tleadtshirt,
      tm1Name,
      tm1Contact,
      tm1Email,
      tm1tshirt,
      tm2Name,
      tm2Contact,
      tm2Email,
      tm2tshirt, 
}
  )
  if (data) {
    error="Participant data has been edited successfully";
    req.flash('error',error)
    res.redirect("/ProgrammingContest/list");
  }
}



module.exports = { getPC, postPC, getPCList, deletePC, paymentDonePC, selectPC, getEditPC, postEditPC,}