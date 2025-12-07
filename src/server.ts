import { Response, Request } from "express"
import config from "./config/config"
import { userRoutes } from "./modules/userModules/user.routes"
import express from "express"
import { signupRoutes } from "./modules/signUpModules/signup.router"
import { initDB } from "./config/db"
import { signinRoutes } from "./modules/signInModules/signIn.router"
import { vehicleRoutes } from "./modules/vehicleModules/vehicles.router"
import { bookingRoutes } from "./modules/bookingModules/booking.router"


const app = express()
const port = config.port
app.use(express.json());

// Database Init ---------------------------------------------------------------------------
initDB()

// CRUD Operations --------------------------------------------------------------------------
// http://localhost:5000/api/v1/users
app.use('/api/v1/users', userRoutes.router)
// http://localhost:5000/api/v1/auth/signup
app.use('/api/v1/auth/signup', signupRoutes.router) 
// http://localhost:5000/api/v1/auth/signin
app.use('/api/v1/auth/signin', signinRoutes.router) 
// http://localhost:5000/api/v1/vehicles
app.use('/api/v1/vehicles', vehicleRoutes.router)
// http://localhost:5000/api/v1/bookings
app.use('/api/v1/bookings', bookingRoutes.router)



// Homepage -> http://localhost:5000/
app.get('/', (req: Request, res: Response) => {
  res.send('Hello World!')
});

export default app;
