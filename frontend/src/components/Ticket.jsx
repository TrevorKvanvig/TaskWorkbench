import formatDistanceToNow from 'date-fns/formatDistanceToNow'

const Ticket = ({ticket}) => {

  return (<div className="ticket">
    <h4>{ticket.ticketTitle}</h4>
    <p>{ticket.ticketDescription}</p>
    <p>{ticket.ticketPriority}</p>
    <p>{formatDistanceToNow(new Date(ticket.createdAt), {addSuffix: true}) }</p>
  </div>);

}

export default Ticket