import formatDistanceToNow from 'date-fns/formatDistanceToNow'

const Ticket = ({ticket}) => {

  return (<div className="ticket">
    <h4>{ticket.ticketTitle}</h4>
    <p>{formatDistanceToNow(new Date(ticket.createdAt), {addSuffix: true}) }</p>
    <span>DELETE</span>
  </div>);

}

export default Ticket