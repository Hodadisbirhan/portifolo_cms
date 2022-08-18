import { gql } from "@apollo/client/core";

export const queryInviterWithEmail = `
query InviteUserWithID($email: String!) {
  invite_users(where: { email: { _eq: $email } }) {
    invite_code
  }
}
`;

export const queryForFetchInvite = `query($email:String!){
  invite_users(where:{email:{_eq:$email}}){
    invite_code
  }
}`;
export const queryAdmin = `query userQueryByEmail($email:String!){
  
  users(where:{email:{_eq:$email}})
  {
   password 
    
  }
}`;

export const fectchAllGust = gql`
  query AllInvitedUser {
    invite_users {
      name
      email
      id
    }
  }
`;

export const fetchSkills = gql `query fetchAllSkill($search:String!){
  skills(where:{name:{_iregex:$search}}){
  name
  level
  id
  }
}
`
export const getForgetCode = `query getForgetCode($email:String!)
{
users(where:{email:{_eq:$email}}) 
  {
  forgetCode
} 
  
}`
export const verifyMutationAction = gql `
mutation($email:String!,$code:String!){
  verify(value:{email:$email,verifyCode:$code})
  {
    status
  }
}
` 
export const fetchEducation = gql`query fetchEducation{
  educations{
    description
    id
    name
       
  }
  
}`

export const fetchExperience = gql`query fetchExperience{
  experiences{
    description
    id
    name
       
  }}`

export const projectQuery = gql `query($search:String!){
  projects(where:{title:{_iregex:$search}})
  {
    date
    description
    id
    link
    size
    title
    image
    
  }
}`

export const fetchService = gql `
query fetchService($search:String)
{
  services(where:{title:{_iregex:$search}})
  {
    id
    title
    description
    year
    image
    satisfied_cleint
    
    
  }
}
`
export const fetchServiceByID = gql `
query fetchServiceById($id:Int!)
{
 services_by_pk(id:$id)
  {
    id
    title
    description
    year
    image
    satisfied_cleint
    
    
  }
  
}
`

export const fetchProjectByID = gql `
query fetchProjectById($id:Int!)
{
 projects_by_pk(id:$id)
  {
    id
    title
    description
    size
    image
   date
    description
    link
      
  }
  
}`

export const fetchAdmin = gql `query($id:uuid!){
  users_by_pk(id:$id){
    first_name
    last_name
    profile_image
    email
    id
    email
    about
    status
    address
    phone
    
    
  }
  
}`

export const fetchSkill = gql`query users($id:uuid!,$search:String!,$offset:Int!) {
  users_by_pk(id:$id){
    number_skill
    skills(where:{name:{_iregex:$search}}  offset:$offset,limit:10){
      name
      id
      level
    }
  }
}`