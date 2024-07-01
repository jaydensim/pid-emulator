const StopsList = new Map([
  ["Allawah", { name: "Allawah", interchange: [] }],
  ["Arncliffe", { name: "Arncliffe", interchange: [] }],
  ["Artarmon", { name: "Artarmon", interchange: [] }],
  ["Ashfield", { name: "Ashfield", interchange: [] }],
  ["Asquith", { name: "Asquith", interchange: [] }],
  ["Auburn", { name: "Auburn", interchange: [] }],
  ["Banksia", { name: "Banksia", interchange: [] }],
  ["Bankstown", { name: "Bankstown", interchange: [] }],
  ["Bardwell Park", { name: "Bardwell Park", interchange: [] }],
  ["Beecroft", { name: "Beecroft", interchange: [] }],
  ["Belmore", { name: "Belmore", interchange: [] }],
  ["Berala", { name: "Berala", interchange: [] }],
  ["Berowra", { name: "Berowra", interchange: [] }],
  ["Beverly Hills", { name: "Beverly Hills", interchange: [] }],
  ["Bexley North", { name: "Bexley North", interchange: [] }],
  ["Birrong", { name: "Birrong", interchange: [] }],
  ["Blacktown", { name: "Blacktown", interchange: [] }],
  ["Bondi Junction", { name: "Bondi Junction", interchange: [] }],
  ["Burwood", { name: "Burwood", interchange: [] }],
  ["Cabramatta", { name: "Cabramatta", interchange: [] }],
  ["Campbelltown", { name: "Campbelltown", interchange: [] }],
  ["Campsie", { name: "Campsie", interchange: [] }],
  ["Canley Vale", { name: "Canley Vale", interchange: [] }],
  ["Canterbury", { name: "Canterbury", interchange: [] }],
  ["Caringbah", { name: "Caringbah", interchange: [] }],
  ["Carlton", { name: "Carlton", interchange: [] }],
  ["Carramar", { name: "Carramar", interchange: [] }],
  ["Casula", { name: "Casula", interchange: [] }],
  ["Central", { name: "Central", interchange: [] }],
  ["Chatswood", { name: "Chatswood", interchange: [] }],
  ["Cheltenham", { name: "Cheltenham", interchange: [] }],
  ["Chester Hill", { name: "Chester Hill", interchange: [] }],
  ["Circular Quay", { name: "Circular Quay", interchange: [] }],
  ["Clarendon", { name: "Clarendon", interchange: [] }],
  ["Clyde", { name: "Clyde", interchange: [] }],
  ["Como", { name: "Como", interchange: [] }],
  ["Concord West", { name: "Concord West", interchange: [] }],
  ["Cronulla", { name: "Cronulla", interchange: [] }],
  ["Croydon", { name: "Croydon", interchange: [] }],
  ["Denistone", { name: "Denistone", interchange: [] }],
  ["Domestic Airport", { name: "Domestic Airport", interchange: [] }],
  ["Doonside", { name: "Doonside", interchange: [] }],
  ["Dulwich Hill", { name: "Dulwich Hill", interchange: [] }],
  ["East Hills", { name: "East Hills", interchange: [] }],
  ["East Richmond", { name: "East Richmond", interchange: [] }],
  ["Eastwood", { name: "Eastwood", interchange: [] }],
  ["Edgecliff", { name: "Edgecliff", interchange: [] }],
  ["Edmondson Park", { name: "Edmondson Park", interchange: [] }],
  ["Emu Plains", { name: "Emu Plains", interchange: [] }],
  ["Engadine", { name: "Engadine", interchange: [] }],
  ["Epping", { name: "Epping", interchange: [] }],
  ["Erskineville", { name: "Erskineville", interchange: [] }],
  ["Fairfield", { name: "Fairfield", interchange: [] }],
  ["Flemington", { name: "Flemington", interchange: [] }],
  ["Glenfield", { name: "Glenfield", interchange: [] }],
  ["Gordon", { name: "Gordon", interchange: [] }],
  ["Granville", { name: "Granville", interchange: [] }],
  ["Green Square", { name: "Green Square", interchange: [] }],
  ["Guildford", { name: "Guildford", interchange: [] }],
  ["Gymea", { name: "Gymea", interchange: [] }],
  ["Harris Park", { name: "Harris Park", interchange: [] }],
  ["Heathcote", { name: "Heathcote", interchange: [] }],
  ["Helensburgh", { name: "Helensburgh", interchange: [] }],
  ["Holsworthy", { name: "Holsworthy", interchange: [] }],
  ["Homebush", { name: "Homebush", interchange: [] }],
  ["Hornsby", { name: "Hornsby", interchange: [] }],
  ["Hurlstone Park", { name: "Hurlstone Park", interchange: [] }],
  ["Hurstville", { name: "Hurstville", interchange: [] }],
  ["Ingleburn", { name: "Ingleburn", interchange: [] }],
  ["International Airport", { name: "International Airport", interchange: [] }],
  ["Jannali", { name: "Jannali", interchange: [] }],
  ["Killara", { name: "Killara", interchange: [] }],
  ["Kings Cross", { name: "Kings Cross", interchange: [] }],
  ["Kingsgrove", { name: "Kingsgrove", interchange: [] }],
  ["Kingswood", { name: "Kingswood", interchange: [] }],
  ["Kirrawee", { name: "Kirrawee", interchange: [] }],
  ["Kogarah", { name: "Kogarah", interchange: [] }],
  ["Lakemba", { name: "Lakemba", interchange: [] }],
  ["Leightonfield", { name: "Leightonfield", interchange: [] }],
  ["Leppington", { name: "Leppington", interchange: [] }],
  ["Leumeah", { name: "Leumeah", interchange: [] }],
  ["Lewisham", { name: "Lewisham", interchange: [] }],
  ["Lidcombe", { name: "Lidcombe", interchange: [] }],
  ["Lindfield", { name: "Lindfield", interchange: [] }],
  ["Liverpool", { name: "Liverpool", interchange: [] }],
  ["Loftus", { name: "Loftus", interchange: [] }],
  ["Macarthur", { name: "Macarthur", interchange: [] }],
  ["Macdonaldtown", { name: "Macdonaldtown", interchange: [] }],
  ["Macquarie Fields", { name: "Macquarie Fields", interchange: [] }],
  ["Marayong", { name: "Marayong", interchange: [] }],
  ["Marrickville", { name: "Marrickville", interchange: [] }],
  ["Martin Place", { name: "Martin Place", interchange: [] }],
  ["Mascot", { name: "Mascot", interchange: [] }],
  ["Meadowbank", { name: "Meadowbank", interchange: [] }],
  ["Merrylands", { name: "Merrylands", interchange: [] }],
  ["Milsons Point", { name: "Milsons Point", interchange: [] }],
  ["Minto", { name: "Minto", interchange: [] }],
  ["Miranda", { name: "Miranda", interchange: [] }],
  ["Mortdale", { name: "Mortdale", interchange: [] }],
  ["Mount Colah", { name: "Mount Colah", interchange: [] }],
  ["Mount Druitt", { name: "Mount Druitt", interchange: [] }],
  ["Mount Kuring-gai", { name: "Mount Kuring-gai", interchange: [] }],
  ["Mulgrave", { name: "Mulgrave", interchange: [] }],
  ["Museum", { name: "Museum", interchange: [] }],
  ["Narwee", { name: "Narwee", interchange: [] }],
  ["Newtown", { name: "Newtown", interchange: [] }],
  ["Normanhurst", { name: "Normanhurst", interchange: [] }],
  ["North Strathfield", { name: "North Strathfield", interchange: [] }],
  ["North Sydney", { name: "North Sydney", interchange: [] }],
  ["Oatley", { name: "Oatley", interchange: [] }],
  ["Olympic Park", { name: "Olympic Park", interchange: [] }],
  ["Padstow", { name: "Padstow", interchange: [] }],
  ["Panania", { name: "Panania", interchange: [] }],
  ["Parramatta", { name: "Parramatta", interchange: [] }],
  ["Pendle Hill", { name: "Pendle Hill", interchange: [] }],
  ["Pennant Hills", { name: "Pennant Hills", interchange: [] }],
  ["Penrith", { name: "Penrith", interchange: [] }],
  ["Penshurst", { name: "Penshurst", interchange: [] }],
  ["Petersham", { name: "Petersham", interchange: [] }],
  ["Punchbowl", { name: "Punchbowl", interchange: [] }],
  ["Pymble", { name: "Pymble", interchange: [] }],
  ["Quakers Hill", { name: "Quakers Hill", interchange: [] }],
  ["Redfern", { name: "Redfern", interchange: [] }],
  ["Regents Park", { name: "Regents Park", interchange: [] }],
  ["Revesby", { name: "Revesby", interchange: [] }],
  ["Rhodes", { name: "Rhodes", interchange: [] }],
  ["Richmond", { name: "Richmond", interchange: [] }],
  ["Riverstone", { name: "Riverstone", interchange: [] }],
  ["Riverwood", { name: "Riverwood", interchange: [] }],
  ["Rockdale", { name: "Rockdale", interchange: [] }],
  ["Rooty Hill", { name: "Rooty Hill", interchange: [] }],
  ["Roseville", { name: "Roseville", interchange: [] }],
  ["Schofields", { name: "Schofields", interchange: [] }],
  ["Sefton", { name: "Sefton", interchange: [] }],
  ["Seven Hills", { name: "Seven Hills", interchange: [] }],
  ["St James", { name: "St James", interchange: [] }],
  ["St Leonards", { name: "St Leonards", interchange: [] }],
  ["St Marys", { name: "St Marys", interchange: [] }],
  ["St Peters", { name: "St Peters", interchange: [] }],
  ["Stanmore", { name: "Stanmore", interchange: [] }],
  ["Strathfield", { name: "Strathfield", interchange: [] }],
  ["Summer Hill", { name: "Summer Hill", interchange: [] }],
  ["Sutherland", { name: "Sutherland", interchange: [] }],
  ["Sydenham", { name: "Sydenham", interchange: [] }],
  ["Tempe", { name: "Tempe", interchange: [] }],
  ["Thornleigh", { name: "Thornleigh", interchange: [] }],
  ["Toongabbie", { name: "Toongabbie", interchange: [] }],
  ["Town Hall", { name: "Town Hall", interchange: [] }],
  ["Turramurra", { name: "Turramurra", interchange: [] }],
  ["Turrella", { name: "Turrella", interchange: [] }],
  ["Villawood", { name: "Villawood", interchange: [] }],
  ["Vineyard", { name: "Vineyard", interchange: [] }],
  ["Wahroonga", { name: "Wahroonga", interchange: [] }],
  ["Waitara", { name: "Waitara", interchange: [] }],
  ["Warrawee", { name: "Warrawee", interchange: [] }],
  ["Warwick Farm", { name: "Warwick Farm", interchange: [] }],
  ["Waterfall", { name: "Waterfall", interchange: [] }],
  ["Waverton", { name: "Waverton", interchange: [] }],
  ["Wentworthville", { name: "Wentworthville", interchange: [] }],
  ["Werrington", { name: "Werrington", interchange: [] }],
  ["West Ryde", { name: "West Ryde", interchange: [] }],
  ["Westmead", { name: "Westmead", interchange: [] }],
  ["Wiley Park", { name: "Wiley Park", interchange: [] }],
  ["Windsor", { name: "Windsor", interchange: [] }],
  ["Wolli Creek", { name: "Wolli Creek", interchange: [] }],
  ["Wollstonecraft", { name: "Wollstonecraft", interchange: [] }],
  ["Woolooware", { name: "Woolooware", interchange: [] }],
  ["Wynyard", { name: "Wynyard", interchange: [] }],
  ["Yagoona", { name: "Yagoona", interchange: [] }],
  ["Yennora", { name: "Yennora", interchange: [] }],
]);

export function Stop(stopname: string, pos?: "first" | "stop" | "last") {
  const stopFound = StopsList.get(stopname) || { name: "", interchange: [] };
  return { ...stopFound, pos: pos || "stop" };
}
