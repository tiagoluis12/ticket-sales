### **System Requirements**
The system will be a **REST API** designed to allow the creation, management and sale of event tickets through partners. It will be scalable to handle thousands of simultaneous accesses.

### **Business Rules**
1. **Ticket Management**
- Only the partner who created the event can manage the associated tickets.
- Tickets are created in batches and start with the status "available".

2. **Ticket Purchase**
- A customer can purchase multiple tickets for different events in a single purchase.
- Only one customer can purchase a specific ticket at a time (concurrency control).
- If the purchase fails, data must be recorded with the reason for the failure.

3. **Purchase Cancellation**
- A customer can cancel the purchase, releasing the tickets for sale again.
- The history of status changes must be maintained.

4. **Scalability**
- The system must support high simultaneous access loads.

5. **Partners**
- Partners will be registered in the system and will have access to a control panel.
- Partners can create events and manage associated tickets.
- Partners can view ticket sales associated with their events.

6. **Customers**
- Customers will be registered in the system and will be able to purchase tickets for events.
- Customers can view available events and purchase tickets.
- Customers can cancel their purchases and view their purchase history.
### **Main Entities**
1. **Partners**
Represents the creators of events and tickets.
**Fields:**
- `id`: Unique identifier (numeric).
- `name`: Full name of the partner.
- `email`: Email for login and contact.
- `password`: Encrypted password.
- `company name`: Name of the associated company.

2. **Customers**
Represents ticket buyers.
**Fields:**
- `id`: Unique identifier (numeric).
- `name`: Full name of the customer.
- `email`: Email for login and contact.
- `password`: Encrypted password.
- `address`: Customer address.
- `phone`: Contact phone number.

3. **Events**
Represents events created by partners.
**Fields:**
- `id`: Unique identifier (numeric).
- `name`: Name of the event.
- `description`: Brief description of the event.
- `date`: Date and time of the event.
- `location`: Location where it will be held.
- `partner_id`: ID of the partner who created the event (foreign key).

4. **Tickets**
Represents the tickets available for each event.
**Fields:**
- `id`: Unique identifier (numeric).
- `evento_id`: ID of the associated event (foreign key).
- `local`: Seat identifier (e.g., A1, B2).
- `preco`: Ticket price.
- `status`: Available, sold.