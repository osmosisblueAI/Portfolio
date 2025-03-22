import { NextResponse } from 'next/server';
import nodemailer from 'nodemailer';

export async function POST(request: Request) {
  try {
    const { name, email, projectType, budget, message } = await request.json();

    // Validate required fields
    if (!name || !email || !message) {
      return NextResponse.json(
        { success: false, message: 'Name, email and message are required' },
        { status: 400 }
      );
    }

    // In a production environment, you would set up a real email service
    // This is just a placeholder that logs the email contents
    console.log('Contact Form Submission:');
    console.log('Name:', name);
    console.log('Email:', email);
    console.log('Project Type:', projectType || 'Not specified');
    console.log('Budget:', budget || 'Not specified');
    console.log('Message:', message);

    /* 
    // Uncomment and configure for a real email service
    const transporter = nodemailer.createTransport({
      host: process.env.EMAIL_HOST,
      port: parseInt(process.env.EMAIL_PORT || '587'),
      secure: process.env.EMAIL_SECURE === 'true',
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASSWORD,
      },
    });

    const mailOptions = {
      from: process.env.EMAIL_FROM,
      to: process.env.EMAIL_TO,
      subject: `New Contact Form Submission from ${name}`,
      text: `
        Name: ${name}
        Email: ${email}
        Project Type: ${projectType || 'Not specified'}
        Budget: ${budget || 'Not specified'}
        
        Message:
        ${message}
      `,
      html: `
        <h2>New Contact Form Submission</h2>
        <p><strong>Name:</strong> ${name}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Project Type:</strong> ${projectType || 'Not specified'}</p>
        <p><strong>Budget:</strong> ${budget || 'Not specified'}</p>
        <p><strong>Message:</strong></p>
        <p>${message.replace(/\n/g, '<br>')}</p>
      `,
    };

    await transporter.sendMail(mailOptions);
    */

    return NextResponse.json(
      { success: true, message: 'Message sent successfully' },
      { status: 200 }
    );
  } catch (error) {
    console.error('Error in contact form submission:', error);
    return NextResponse.json(
      { success: false, message: 'Error sending message' },
      { status: 500 }
    );
  }
} 