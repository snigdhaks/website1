import { factories } from '@strapi/strapi';

export default factories.createCoreController('api::subscriber.subscriber', ({ strapi }) => ({
  async create(ctx) {
    const body = ctx.request.body as any;
    let email = '';

    if (body && body.data && body.data.email) {
      email = body.data.email;
    } else if (body && body.email) {
      email = body.email;
    }

    if (!email) {
      return ctx.badRequest('Email is required.');
    }

    email = email.toLowerCase().trim();

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return ctx.badRequest('Please enter a valid email address.');
    }

    // Check for duplicate subscriber
    const existing = await strapi.documents('api::subscriber.subscriber').findFirst({
      filters: { email }
    });

    if (existing) {
      return ctx.badRequest('This email is already subscribed.');
    }

    // Create a new active subscriber
    const response = await strapi.documents('api::subscriber.subscriber').create({
      data: {
        email,
        active: true
      }
    });

    return response;
  }
}));
