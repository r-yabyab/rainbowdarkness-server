const mongoose = require('mongoose')
const Rainbow = require('../models/rainbowModel')

const postRainbow = async (req, res) => {
    const {number} = req.body

    try {
        const rainbow = await Rainbow.create({number})
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
    getAllRainbow,
    getLast
}