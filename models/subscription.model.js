import mongoose from "mongoose";

const SubscriptionSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Name is required"],
      trim: true,
      minlength: 2,
      maxlength: 100,
    },
    price: {
      type: Number,
      required: [true, "Price is required"],
      min: [0, "Price must be positive"],
    },
    currency: {
      type: String,
      enum: ["USD", "EUR", "GBP", "INR", "JPY"],
      default: "USD",
      required: [true, "Currency is required"],
    },
    frequency: {
      type: String,
      enum: ["daily", "weekly", "monthly", "yearly"],
      default: "daily",
    },
    category: {
        type: String,
        enum: ["sports", "entertainment", "education", "health", "technology"],
        default: "entertainment",
        required: [true, "Category is required"],
    },
    paymentMethod: {
      type: String,
      required: [true, "Payment method is required"],
      trim: true,
    },
    status: {
      type: String,
      enum: ["active", "inactive", "cancelled"],
      default: "active",
    },
    startDate: {
      type: Date,
      required: [true, "Start date is required"],
      validate: {
        validator: (value) => value <= new Date(),
        message: "Start date cannot be in the future",
      }
    },
    renewalDate: {
        type: Date,
        required: [true, "Renewal date is required"],
        validate: {
            validator: function(value) {
                return value > this.startDate;
            },
            message: "Renewal date must be after start date"
        }
    },

    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: [true, "User ID is required"],
        index: true,
    }
  },
  { timestamps: true }
);

//Auto renewal date if missing
SubscriptionSchema.pre("save", function (next) {
    if(!this.renewalDate) {
        const renewalPeriod = {
            daily: 1,
            weekly: 7,
            monthly: 30,
            yearly: 365
        }
        this.renewalDate = new Date(this.startDate);
        this.renewalDate.setDate(this.renewalDate.getDate() + renewalPeriod[this.frequency]); 
    }

    //Auto update renewal date 
    if(this.renewalDate < new Date()) {
        this.status = "Expired";
    }

    next()
})


const Subscription = mongoose.model("Subscription", SubscriptionSchema);
export default Subscription;
