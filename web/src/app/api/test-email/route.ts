import { NextResponse } from 'next/server';
import nodemailer from 'nodemailer';
import fs from 'fs';
import path from 'path';

export async function POST() {
  try {
    // 1. Get configuration
    const SITEDATA_FILE = path.join(process.cwd(), 'src', 'data', 'siteData.json');
    let contactEmail = 'weiyangfang950@gmail.com'; // Default

    try {
      if (fs.existsSync(SITEDATA_FILE)) {
        const data = JSON.parse(fs.readFileSync(SITEDATA_FILE, 'utf-8'));
        if (data.global && data.global.contactEmail) {
          contactEmail = data.global.contactEmail;
        }
      }
    } catch (e) {
      console.error('Failed to read siteData for email', e);
    }

    // 2. Configure Transporter
    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });

    // 3. Send Email
    if (!process.env.EMAIL_USER || !process.env.EMAIL_PASS) {
      console.warn('Test Email: Missing credentials.');
      return NextResponse.json({ 
        success: false, 
        message: '未配置邮箱环境变量 (EMAIL_USER, EMAIL_PASS)，仅模拟发送。' 
      });
    }

    await transporter.sendMail({
      from: process.env.EMAIL_USER,
      to: contactEmail,
      subject: '【系统测试】邮件通道联通性验证',
      text: `恭喜！您的网站邮件发送功能配置成功。\n\n发送时间: ${new Date().toLocaleString('zh-CN')}\n接收邮箱: ${contactEmail}`,
    });

    return NextResponse.json({ success: true, message: `测试邮件已发送至 ${contactEmail}` });

  } catch (error) {
    console.error('Test email failed:', error);
    return NextResponse.json({ 
      success: false, 
      message: '发送失败: ' + (error as Error).message 
    }, { status: 500 });
  }
}
