import { PrismaClient } from '@prisma/client';
import express from 'express';
import StatusCode from 'status-code-enum';

const router = express.Router();

const prisma = new PrismaClient();

router
  .route('/profiles')
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
  })
  .put(async (req, res) => {
    const profile = req.body;

    await prisma.profiles.update({
      where: {
        id: profile.id,
      },
      data: profile,
    });

    res.status(StatusCode.SuccessOK).end();
  });

router
  .route('/profiles/:id')
  .get(async (req, res) => {
    const id = Number(req.params.id);

    if (isNaN(id)) {
      res.status(StatusCode.ClientErrorBadRequest).end();
      return;
    }

    try {
      const profile = await prisma.profiles.findUniqueOrThrow({
        where: {
          id,
        },
      });

      res.status(StatusCode.SuccessOK).json({
        ...profile,
        logo: profile.logo.toString('base64'),
      });
    } catch (e) {
      res.status(StatusCode.SuccessNoContent).end();
    }
  })
  .delete(async (req, res) => {
    const id = Number(req.params.id);

    if (isNaN(id)) {
      res.status(StatusCode.ClientErrorBadRequest).end();
      return;
    }

    await prisma.profiles.delete({
      where: {
        id,
      },
    });

    res.status(StatusCode.SuccessOK).end();
  });

router.route('/profiles/:id/projects').get(async (req, res) => {
  const id = Number(req.params.id);

  if (isNaN(id)) {
    res.status(StatusCode.ClientErrorBadRequest).end();
    return;
  }

  try {
    const projects = await prisma.profiles.findUniqueOrThrow({
      where: {
        id,
      },
      select: {
        projects: true,
      },
    });

    res.status(StatusCode.SuccessOK).json(projects);
  } catch (e) {
    res.status(StatusCode.SuccessNoContent).end();
  }
});

export default router;
