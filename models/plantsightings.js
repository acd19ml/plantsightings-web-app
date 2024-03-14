let mongoose = require('mongoose');

// Get the Schema class from mongoose
let Schema = mongoose.Schema;

// Define the schema for the Student model
let PlantSightingSchema = new Schema(
    {
        dateSeen: { type: Date, required: true },
        location: {
            type: {
                type: String,
                enum: ['Point'],
                required: true
            },
            coordinates: {
                type: [Number], // Array of numbers for longitude and latitude
                required: true

            }
        },
        description: { type: String },
        plantSize: {
            height: { type: Number },
            spread: { type: Number }
        },
        plantCharacteristics: {
            flowers: { type: Boolean },
            leaves: { type: Boolean },
            fruitsOrSeeds: { type: Boolean },
            sunExposure: { type: String, enum: ['full sun', 'partial shade', 'full shade'] },
            flowerColor: { type: String }
        },
        identification: {
            name: { type: String },
            status: { type: String, enum: ['completed', 'in-progress'] },
            dbpediaUri: { type: String }
        },
        photo: { type: String },
        nickname: { type: String },
        // comments: [{ type: Schema.Types.ObjectId, ref: 'Comment' }]
    }
);

// Ensure the GeoJSON coordinates are indexed for geospatial queries
PlantSightingSchema.index({ location: '2dsphere' });

// Configure the 'toObject' option for the schema to include getters
// and virtuals when converting to an object
PlantSightingSchema.set('toObject', { getters: true, virtuals: true });

// Create the mongoose model 'Plantsighting' based on the defined schema
let Plantsighting = mongoose.model('plantsighting', PlantSightingSchema);

// Export the Plantsighting model for use in other modules
module.exports = Plantsighting;

