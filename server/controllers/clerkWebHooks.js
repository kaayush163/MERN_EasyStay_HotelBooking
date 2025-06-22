import { Webhook } from "svix";
import User from "../models/User.js";
// import { verifyWebhook } from "@clerk/express/webhooks";
// API Controller Function to Manage Clerk User with database
// POST /api/clerk
const clerkWebhooks = async (req, res) => {
  try {
    // const evt = await verifyWebhook(req);

    // // Do something with payload
    // // For this guide, log payload to console
    // const { id } = evt.data;
    // const eventType = evt.type;
    // console.log(
    //   `Received webhook with ID ${id} and event type of ${eventType}`
    // );
    // console.log("Webhook payload:", evt.data);

    // Create a Svix instance with clerk webhook secret.
    const whook = new Webhook(process.env.CLERK_WEBHOOK_SECRET);
    const timestamp = Math.floor(Date.now() / 1000);
    // Getting Headers
    const headers = {
      "svix-id": req.headers["svix-id"],
      "svix-timestamp": req.headers["svix-timestamp"],
      "svix-signature": req.headers["svix-signature"],
      // "svix-id": req.headers["id"],
      // "svix-timestamp": req.headers["timestamp"],
      // "svix-signature": req.headers["signature"],
      // "svix-id": "msg_2yrUlCpRDNpetRYyyYH3mpMxXBf",
      // "svix-timestamp": "1750592334",
      // "svix-signature": "v1,OUrK/4qQF9B9NrwLjTqtwu+nP6X3e5/0BZ5PqGWRYzg=",
    };

    // Verifying Headers
    await whook.verify(JSON.stringify(req.body), headers);

    // Getting Data from request body
    const { data, type } = req.body;

    const userData = {
      _id: data.id,
      email: data.email_addresses[0].email_address,
      username: data.first_name + " " + data.last_name,
      image: data.image_url,
    };

    // Switch Cases for differernt Events
    switch (type) {
      case "user.created": {
        await User.create(userData);
        break;
      }

      case "user.updated": {
        await User.findByIdAndUpdate(data.id, userData);
        break;
      }

      case "user.deleted": {
        await User.findByIdAndDelete(data.id);
        break;
      }

      default:
        break;
    }

    res.json({ success: true, message: "Webhook Recieved by Svix" });
  } catch (error) {
    console.log(res);

    console.log(error.message);

    res.json({ success: false, message: error.message });
  }
};

export default clerkWebhooks;
