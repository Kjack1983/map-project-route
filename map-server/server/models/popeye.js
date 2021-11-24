import mongoose from 'mongoose';
let Schema = mongoose.Schema;

let PopeyeSchema = new Schema({
    name: {
        type: String,
        required: [true, 'Name field is required'],
        unique: true,
        trim: true,
        maxLength: [10, 'Store ID must be less than 10 chars']
    },
    route: {
        type: {
            type: String,
            default: "Feature"
        },
        properties: {
            type: Schema.Types.Mixed, 
            default: {}
        },
        geometry: {
            type : {
                type: String,
                required: [true, 'Coordinates are required'],
                default: 'LineString'
            },
            coordinates: Array
        }
    }
}, { retainKeyOrder: true, minimize: false });

// Sets the created_at parameter equal to the current time
PopeyeSchema.index({geometry : '2dsphere'});
const PopeyeRoutes = mongoose.model('popeye', PopeyeSchema);

export default PopeyeRoutes;