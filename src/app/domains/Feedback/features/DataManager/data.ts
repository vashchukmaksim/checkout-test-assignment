import type { FeedbackMessage } from 'app/domains/Feedback'

// generated with ChatGPT :)
export const testData: FeedbackMessage[] = [
	{
		userName: 'JohnDoe',
		email: 'john.doe@example.com',
		comment:
			'I had a great experience with the service provided by your company. The team was helpful, knowledgeable, and professional throughout the process. The service was top-notch and exceeded my expectations. I would definitely recommend your services to others and look forward to doing business with you again in the future.',
		rating: 5,
		createdAt: new Date('2022-12-15 12:00').getTime(),
	},
	{
		userName: 'JaneSmith',
		email: 'jane.smith@example.com',
		comment:
			'While the service was satisfactory, there were areas for improvement. The response time was slow and the communication could have been better. Additionally, there were a few issues with the delivery of the service. I hope these issues will be addressed in the future to provide a better experience for customers.',
		rating: 3,
		createdAt: new Date('2022-11-29 12:00').getTime(),
	},
	{
		userName: 'BobJohnson',
		email: 'bobjohnson@example.com',
		comment:
			"I am extremely impressed with the service I received from your company. The team went above and beyond to provide excellent service and support. The end result was fantastic and I couldn't be happier with the experience. I highly recommend your services to others and will definitely be using your services again in the future.",
		rating: 5,
		createdAt: new Date('2022-10-20 12:00').getTime(),
	},
	{
		userName: 'AliceBrown',
		email: 'alice.brown@example.com',
		comment:
			'I was extremely disappointed with the service I received. The team was unprofessional, slow to respond, and did not deliver the promised service. I would not recommend your services to others and I am very dissatisfied with the experience I had. I hope improvements will be made in the future to provide a better experience for customers.',
		rating: 1,
		createdAt: new Date('2022-09-10 12:00').getTime(),
	},
	{
		userName: 'MikeDavis',
		email: 'mike.davis@example.com',
		comment:
			'Overall, I was satisfied with the service I received. The team was responsive and provided the service as promised. While there were some small issues, they were resolved quickly and efficiently. I would recommend your services to others and will consider using your services again in the future.',
		rating: 4,
		createdAt: new Date('2022-08-01 12:00').getTime(),
	},
	{
		userName: 'MikeDavis',
		email: 'mike.davis@example.com',
		comment:
			'Overall, I was satisfied with the service I received. The team was responsive and provided the service as promised. While there were some small issues, they were resolved quickly and efficiently. I would recommend your services to others and will consider using your services again in the future.',
		rating: 2,
		createdAt: new Date('2022-08-01 12:20').getTime(),
	},
	{
		userName: 'MikeDavis',
		email: 'mike.davis@example.com',
		comment:
			'Overall, I was satisfied with the service I received. The team was responsive and provided the service as promised. While there were some small issues, they were resolved quickly and efficiently. I would recommend your services to others and will consider using your services again in the future.',
		rating: 2,
		createdAt: new Date('2022-08-01 12:30').getTime(),
	},
]
