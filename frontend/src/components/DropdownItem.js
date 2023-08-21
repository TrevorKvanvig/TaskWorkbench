
const DropdownItem = ({object, changeTeam}) => {


  return (<li className='team-dropdown-item' onClick={()=> {
    changeTeam(object);
  }}>{object.teamTitle}</li>);
}

export default DropdownItem;