export default function formatDate(date){
  const newDate = new Date(date)
  const dateMDY = newDate.toLocaleDateString([],
    {day:'numeric', month:'long', year:'numeric', hour:'numeric', minute:'numeric'})
  return dateMDY.replace(' г.', '')
}