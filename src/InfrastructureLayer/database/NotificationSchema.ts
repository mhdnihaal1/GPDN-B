import mongoose, { Schema, Document, Model } from "mongoose";
import INotification from "../../DomainLayer/NotificationDomain";

const notificationSchema: Schema<INotification & Document> = new Schema(
    {
      userId: { type: String, required: true, ref: 'User' },  
      message: { type: String, required: true },
      isRead: { type: Boolean, default: false },  
    },
    { timestamps: { createdAt: true, updatedAt: false } }  
  );

const Notification: Model<INotification & Document> = mongoose.model<INotification & Document>(
     "Notification",
     notificationSchema
);

export default Notification;
