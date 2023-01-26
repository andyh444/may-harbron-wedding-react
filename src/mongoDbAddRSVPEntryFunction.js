// This function is the endpoint's request handler.
exports = async function({ query, headers, body}, response) {
    const collection = context.services.get("mongodb-atlas").db("wedding_rsvp").collection("wedding_rsvp");
    
    if (body) {
      const parsed = EJSON.parse(body.text());
      
      const rsvp = {
        name: parsed.name,
        canAttend: parsed.canAttend,
        dietaryRequirements: parsed.dietaryRequirements,
			  comments: parsed.comments,
			  timeStamp: parsed.timeStamp,
			  isEvening: parsed.isEvening
      }
      
      try {
        const res = await collection.insertOne(rsvp);
        return {
          response: res,
          object: rsvp
        };
      }
      catch (e) {
        return { error: e }
      }
    }
    return { error: "No body"}
};
