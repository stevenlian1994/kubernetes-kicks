import express, { NextFunction, Request, Response, Router } from 'express';

const router: Router = express.Router();
let host: string;
if(process.env.NODE_ENV === 'production') {
  host = "http://merchant_register:3001/merchants"
} else {
  host = "http://localhost:3001/merchants"
}

// Create new merchant
router.post('/', async (req: Request, res: Response, next: NextFunction) => {
  try {
    const {email, password, companyName} = req.body;

    const microserviceResponse = await fetch(host, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ "email": email, "password": password, "companyName": companyName }),
  })
  if (microserviceResponse.ok) {
    const data = await microserviceResponse.json();
    console.log('post MS:');
    console.log(data);
    
    // Forward the microservice response to the client
    res.status(microserviceResponse.status).json(data);
  } else {
    // Handle errors from the microservice or other errors
    const errorText = await microserviceResponse.text();
    console.error('Error from microservice:', errorText);
    res.status(500).send('Something went wrong!');
  }
} catch (error: any) {
  // Handle fetch-related errors
  if (error instanceof Error) {
    console.error('Fetch error:', error.message);
  } else {
    console.error('Unknown fetch error:', error);
  }
  res.status(500).send('Something went wrong!');
  }
});

// Get all merchants
router.get('/', async (req: Request, res: Response, next: NextFunction) => {
  try {
    const microserviceResponse = await fetch(host);
    
    if (microserviceResponse.ok) {
      const data = await microserviceResponse.json();
      console.log('fetch MS:');
      console.log(data);
      
      // Forward the microservice response to the client
      res.status(microserviceResponse.status).json(data);
    } else {
      // Handle errors from the microservice or other errors
      const errorText = await microserviceResponse.text();
      console.error('Error from microservice:', errorText);
      res.status(500).send('Something went wrong!');
    }
  } catch (error: any) {
    // Handle fetch-related errors
    if (error instanceof Error) {
      console.error('Fetch error:', error.message);
    } else {
      console.error('Unknown fetch error:', error);
    }
    res.status(500).send('Something went wrong!');
  }
});

// Get user by ID
router.get('/:id', async (req: Request, res: Response, next: NextFunction) => {
  try {

    const microserviceResponse = await fetch(`${host}/${Number.parseInt(req.params.id)}`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  })
  if (microserviceResponse.ok) {
    const data = await microserviceResponse.json();
    console.log('GET ID MS:');
    console.log(data);
    
    // Forward the microservice response to the client
    res.status(microserviceResponse.status).json(data);
  } else {
    // Handle errors from the microservice or other errors
    const errorText = await microserviceResponse.text();
    console.error('Error from microservice:', errorText);
    res.status(500).send('Something went wrong!');
  }
} catch (error: any) {
  // Handle fetch-related errors
  if (error instanceof Error) {
    console.error('Fetch error:', error.message);
  } else {
    console.error('Unknown fetch error:', error);
  }
  res.status(500).send('Something went wrong!');
  }
});

// Update user by ID
router.put('', async (req: Request, res: Response, next: NextFunction) => {
  try {
    const {id, email, password, companyName} = req.body;
    const microserviceResponse = await fetch(host, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({id:id, "email": email, "password": password, "companyName": companyName }),
  })
  if (microserviceResponse.ok) {
    const data = await microserviceResponse.json();
    console.log('PUT MS:');
    console.log(data);
    
    // Forward the microservice response to the client
    res.status(microserviceResponse.status).json(data);
  } else {
    // Handle errors from the microservice or other errors
    const errorText = await microserviceResponse.text();
    console.error('Error from microservice:', errorText);
    res.status(500).send('Something went wrong!');
  }
} catch (error: any) {
  // Handle fetch-related errors
  if (error instanceof Error) {
    console.error('Fetch error:', error.message);
  } else {
    console.error('Unknown fetch error:', error);
  }
  res.status(500).send('Something went wrong!');
  }
});

// Delete user by ID
router.delete('/:id', async (req: Request, res: Response, next: NextFunction) => {
  try {
    const microserviceResponse = await fetch(`${host}/${Number.parseInt(req.params.id)}`, {
    method: 'DELETE',
  })
  if (microserviceResponse.status === 204) {
    console.log('DELETE MS:');
    res.sendStatus(204);
  } else {
    // Handle errors from the microservice or other errors
    const errorText = await microserviceResponse.text();
    console.error('Error from microservice:', errorText);
    res.status(500).send('Something went wrong!');
  }
} catch (error: any) {
  // Handle fetch-related errors
  if (error instanceof Error) {
    console.error('Fetch error:', error.message);
  } else {
    console.error('Unknown fetch error:', error);
  }
  res.status(500).send('Something went wrong!');
  }

});

module.exports = router;