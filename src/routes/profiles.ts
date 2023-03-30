import { PrismaClient } from '@prisma/client';
import express from 'express';
import StatusCode from 'status-code-enum';

const router = express.Router();

const prisma = new PrismaClient();

router
  .route('/profiles')
  // Get метод надо удалить, это сниппет, потом перенесем в projects
  .get(async (_, res) => {
    const profiles = await prisma.profiles.findMany();

    res.json(
      profiles.map(p => ({
        ...p,
        logo: p.logo.toString('base64'),
      }))
    );
  })
  .post(async (req, res) => {
    const profile = req.body;

    const logo = Buffer.from(profile.logo, 'base64');

    await prisma.profiles.create({
      data: {
        ...profile,
        logo,
      },
    });

    res.status(StatusCode.SuccessOK).end();
  });

router.route('/profiles/:id').get().put().delete();

export default router;
