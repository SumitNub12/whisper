import mongoose, { Document, Schema } from 'mongoose';

export interface Message extends Document {
	_id: string;
	content: string;
	createdAt: Date;
}

const MessageSchema: Schema<Message> = new Schema({
	content: {
		type: String,
		required: true,
	},
	createdAt: {
		type: Date,
		required: true,
		default: Date.now,
	},
});

export interface User extends Document {
	username: string;
	email: string;
	password: string;
	verifyCode: string;
	verifyCodeExpiry: Date;
	isVerified: boolean;
	isAcceptingMessages: boolean;
	messages: Message[];
}

const UserSchema: Schema<User> = new Schema({
	username: {
		type: String,
		required: [true, 'Username is required'],
		unique: true,
	},
	email: {
		type: String,
		required: [true, 'Email is required'],
		unique: true,
		match: [
			/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
			'Please fill a valid email address',
		],
	},
	password: {
		type: String,
		required: [true, 'Password is required'],
	},
	verifyCode: {
		type: String,
		required: [true, 'Verify code is required'],
	},
	verifyCodeExpiry: {
		type: Date,
		required: [true, 'Verify code expiry is required'],
	},
	isVerified: {
		type: Boolean,
		default: false,
	},
	isAcceptingMessages: {
		type: Boolean,
		required: [true, 'Accepting message status is required'],
		default: true,
	},
	messages: {
		type: [MessageSchema],
		default: [],
	},
});

export { MessageSchema, UserSchema };

const UserModel =
	(mongoose.models.User as mongoose.Model<User>) ||
	mongoose.model<User>('User', UserSchema);

export default UserModel;
