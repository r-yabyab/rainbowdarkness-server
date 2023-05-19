const mongoose = require('mongoose')
const Rainbow = require('../models/rainbowModel')
// const checkJwt = require('../middleware/auth')
// const jwt = require('jsonwebtoken')
// const secret = process.env.JWT_SECRET

const postRainbow = async (req, res) => {
  const {number} = req.body

  try {
      const rainbow = await Rainbow.create({number})
      // res.status(200).json(rainbow)
      res.status(200).json({ _id: rainbow._id, ...rainbow._doc });
  } catch (error) {
      res.status(400).json({error: error.message})
  }
}

// includes auth0 user.sub when posting number
const postRainbowUser = async (req, res) => {
    const {number} = req.body
    const {sub} = req.query
    // console.log(req.query)

    try {
        const rainbow = await Rainbow.create({
          number,
          userID: sub
        })
        // const rainbow = await Rainbow.save({number})
        // const rainbow = await newRainbow.save()
        res.status(200).json(rainbow)
    } catch (error) {
        res.status(400).json({error: error.message})
    }
}




//
//
//WORKS
//
// const getAllRainbow = async (req, res) => {    
//     const rainbows = await Rainbow.find({}).sort({createdAt: -1})
//     res.status(200).json(rainbows)
// }

// returns total and avg mood
const getAllRainbow = async (req, res) => {    
  const rainbows = await Rainbow.aggregate([
    {
      '$group': {
        '_id': '__v0', 
        'totalEntries': {
          '$count': {}
        }, 
        'avgPrice': {
          '$avg': '$number'
        }
      }
    }
  ])
  res.status(200).json(rainbows)
}

// for debugging, not used in prod
const getSingleRainbow = async (req, res) => {
  const { id } = req.params

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({error: 'No such number'})
  }

  const rainbows = await Rainbow.findById(id)

  if (!rainbows) {
    return res.status(404).json({error: "no such number"})
  }

  res.status(200).json(rainbows)
}

// if user has account, this allows them to claim their number with their user.sub
const putRainbowUserNum = async (req, res) => {
  const id = req.query.id
  const sub = req.query.sub

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({error: 'No such number ++++++'})
  }

  const putRainbow = await Rainbow.findOneAndUpdate({ _id: id}, {
    userID: sub
  })

  if(!Rainbow) {
    return res.status(400).json({error: 'No such number ----'})
  }

  res.status(200).json(putRainbow)
}


const putRainbowDetails = async (req, res) => {
  // const sub = req.query.sub
  const id = req.query.id
  const sleepNumber = req.query.sleepNumber
  const activities = req.query.activities
  const memoText = req.query.memoText
  const moodNumber = req.query.moodNumber

  console.log(req.query.sleepNumber)
    // console.log('req.query:' + req.query.id)

  // const id = `ObjectID('${id1}')`
  // console.log('id:' + id)
  // console.log('sub:' + sub)

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({error: 'no such number in db'})
  }

  const updateFields = {}

  if (sleepNumber !== '') {
    updateFields.timeSlept = sleepNumber
  }

  if (activities !== '') {
    updateFields.activities = activities
  }

  if (memoText !== '') {
    updateFields.memo = memoText
  }

  if (moodNumber !== '') {
    updateFields.number = moodNumber
  }

  // const putRainbowMemo = await Rainbow.findOneAndUpdate({ _id: id}, {
  //   // userID: sub,
  //   timeSlept: sleepNumber,
  //   activities: activities,
  //   memo: memoText
  // })

  const putRainbowMemo = await Rainbow.findOneAndUpdate({ _id: id }, updateFields)
  if (!Rainbow) {
    return res.status(400).json({error: 'no such number in db'})

  }
  res.status(200).json(putRainbowMemo)

}

const deleteRainbowDetails = async (req, res) => {
  const id = req.query.id
  const fieldToDelete = req.query.fieldToDelete

  console.log('fieldToDelete:', fieldToDelete)
  console.log('id:', id)

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ error: 'No such number in the database' })
  }

  const updateFields = { $unset: {} }
  updateFields.$unset[fieldToDelete] = 1

  try {
  const putRainbowMemo = await Rainbow.findOneAndUpdate({ _id: id }, updateFields, { new: true })
  
  if (!putRainbowMemo) {
    return res.status(400).json({ error: 'No such number in the database' })
  }

  res.status(200).json(putRainbowMemo)
  } catch (error) {
    if (error.code === 429) {
      return res.status(429).json({ error: 'Too Many Requests' })
    }
    return res.status(500).json({ error: 'Internal Server Error' })
  }
}




const getLast = async (req, res) => {
  const rainbowsLast = await Rainbow.aggregate([
    // created at -1 descending (most recent), limit for # of items
    {
      '$sort': {
        'createdAt': -1
      }
    }, 
    // {
    //   '$limit': 25
    // }
  ])
  res.status(200).json(rainbowsLast)
}

// gets all of users nums, for matching with last
const getLastNumUser = async (req, res) => {
  const { sub } = req.query
  
  if (sub) {
  const rainbowsLastNumUser = await Rainbow.aggregate([
    {
      '$match': {
        'userID': sub
      }
    },
    // sort by created at -1 descending (most recent), limit for # of items
    {
      '$sort': {
        'createdAt': -1
      }
    }
  ])
  res.status(200).json(rainbowsLastNumUser)
  // console.log(rainbowsLastNumUser)
  } else {
    console.log('not found')
  }
}

// adds date context after mongoDB pipelines fire
const startOfWeek = new Date();
startOfWeek.setDate(startOfWeek.getDate() - startOfWeek.getDay());
startOfWeek.setHours(0, 0, 0, 0);

const getWeek = async (req, res) => {
 const rainbowWeek = await Rainbow.aggregate([
  {
    '$match': {
      'createdAt': { $gte: startOfWeek }
    }
  },
  {
    '$sort': {
      'createdAt': 1
    }
  }
])
res.status(200).json(rainbowWeek)
}


const today = new Date();
const startOfDay = new Date(Date.UTC(today.getUTCFullYear(), today.getUTCMonth(), today.getUTCDate(), 0, 0, 0));
const endOfDay = new Date(Date.UTC(today.getUTCFullYear(), today.getUTCMonth(), today.getUTCDate(), 23, 59, 59));

const getToday = async (req, res) => {

  const rainbowToday = await Rainbow.aggregate([
  {
    $match: {
      'createdAt': {
        '$gte': startOfDay,
        '$lt': endOfDay
      }
    }
  },
  {
    '$sort': {
      'createdAt': 1
    }
  }
])
res.status(200).json(rainbowToday)
console.log(startOfDay + "startofDay")
console.log(endOfDay + 'endofDay')
}

// const getLatestRainbow = async (req, res) => {
//   const latestRainbow = await Rainbow.findOne({}, { sort: { createdAt: -1 } });
//   res.status(200).json(latestRainbow);
// };


// get average

// async function printAverageNumber() {
//   const pipeline = [
//     {
//       '$group': {
//         '_id': '$__v', 
//         'avgPrice': {
//           '$avg': '$number'
//         }
//       }
//     }
//   ];
// }




module.exports = {
    postRainbow,
    postRainbowUser,
    getAllRainbow,
    getSingleRainbow,
    getLast,
    getLastNumUser,
    getWeek,
    getToday,
    putRainbowUserNum,
    putRainbowDetails,
    deleteRainbowDetails
}