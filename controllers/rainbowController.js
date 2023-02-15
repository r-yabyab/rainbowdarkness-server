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
    {
      $match: {
        createdAt: {
          $gte: new Date(new Date().setHours(0,0,0,0) - 7 * 24 * 60 * 60 * 1000) // Filter for documents created within the past week
        }
      }
    },
    {
      $group: {
        _id: null,
        count: {
          $sum: 1 // Count the number of matching documents
        }
      }
    },
    {
      $project: {
        _id: 0,
        documentCount: 1 // Exclude the _id field and only return the count
      }
    }
  ])
  res.status(200).json(rainbows)
}



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
    getAllRainbow
}