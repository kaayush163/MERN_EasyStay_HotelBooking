import User from "../models/User.js";
import { Webhook } from "svix";

const clerkWebHooks = async (req, res) => {
  try {
    const whook = new Webhook(process.env.CLERK_WEBHOOK_SECRET);

    // Getting Headers
    const headers = {
      "svix-id": req.headers["svix-id"],
      "svix-signature": req.headers["svix-timestamp"],
    };

    //Verify headers
    await whook.verify(JSON.stringify(req.body), headers);

    //Getting Data from request body
    const { data, type } = req.body;

    // whatever added in model user this is doing for storing in table the user details
    // these data coming from server so have an expericnec dealing with that at foirst index address will be stored otherwise have to look from console.log on browser
    const userData = {
      _id: data.id,
      email: data.email_addresses[0].email_address,
      username: data.first_name + " " + data.last_name,
      image: data.image_url,
    };

    //based on type coming from req.body we will will use switch case statement
    switch (type) {
      // user created from clerk that checkbox options in webhooks configuration
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

    res.json({ success: true, message: "Webhook Received" });
  } catch (error) {
    console.log(error.message);
    res.json({ success: false, message: error.message });
  }
};

export default clerkWebHooks;
