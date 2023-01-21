import * as express from 'express';
import UserRouter from './routes/User.route';
import TeamRouter from './routes/Team.route';
import MatchRouter from './routes/Match.route';
import LeaderRouter from './routes/Leaderboard.route';

class App {
  public app: express.Express;

  constructor() {
    this.app = express();

    this.config();
    this.routes();

    // Não remover essa rota
    this.app.get('/', (req, res) => res.json({ ok: true }));
    // this.app.use(errorMiddleware);
  }

  private routes(): void {
    this.app.use('/login', UserRouter);
    this.app.use('/teams', TeamRouter);
    this.app.use('/matches', MatchRouter);
    this.app.use('/leaderboard', LeaderRouter);
    // this.app.get('/', (req, res) => res.status(201).json({ ok: true }));
  }

  private config():void {
    const accessControl: express.RequestHandler = (_req, res, next) => {
      res.header('Access-Control-Allow-Origin', '*');
      res.header('Access-Control-Allow-Methods', 'GET,POST,DELETE,OPTIONS,PUT,PATCH');
      res.header('Access-Control-Allow-Headers', '*');
      next();
    };

    this.app.use(express.json());
    this.app.use(accessControl);
  }

  public start(PORT: string | number):void {
    this.app.listen(PORT, () => console.log(`Running on port ${PORT}`));
  }
}

export { App };

// Essa segunda exportação é estratégica, e a execução dos testes de cobertura depende dela
export const { app } = new App();
