import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { Transform } from 'class-transformer';

@Schema({
  timestamps: true,
  toJSON: { virtuals: true },
})
export class User extends Document {
  @Prop({ trim: true })
  name: string;

  @Prop({ trim: true, lowercase: true })
  @Transform(({ value }) => value || null, { toClassOnly: true })
  email: string;

  @Prop()
  image: string;

  @Prop({
    validate: {
      validator: (value: string) => value.startsWith('cus_'),
      message: 'customerId must start with "cus_"',
    },
  })
  customerId: string;

  @Prop({
    validate: {
      validator: (value: string) => value.startsWith('price_'),
      message: 'priceId must start with "price_"',
    },
  })
  priceId: string;

  @Prop({ default: false })
  hasAccess: boolean;
}

export const UserSchema = SchemaFactory.createForClass(User);

// Implement toJSON or any other plugin functionality directly within the class if needed
UserSchema.set('toJSON', {
  transform: function (doc, ret) {
    delete ret.__v; // Hide version key
    return ret;
  },
  virtuals: true,
});
