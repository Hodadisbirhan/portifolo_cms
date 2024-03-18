import { gql } from "@apollo/client/core";
//affected
export const inviteUserMutation = `mutation($email:String!,$name:String!,$invite_code:String!,$user_id:uuid!){
  
    insert_invite_users(objects:{email:$email,invite_code:$invite_code,name:$name,user_id:$user_id})
    {
      affected_rows
    }
  }`;
//affected
export const invitMutation = gql`
  mutation ($email: String!, $name: String!, $user_id: uuid!) {
    inviteUser(value: { email: $email, name: $name, user_id: $user_id }) {
      isInvited
      message
    }
  }
`;
export const changePasswordMutation = gql`
  mutation ($oldPass: String!, $newPass: String!, $email: String!) {
    changePassword(
      value: { oldPassword: $oldPass, newPassword: $newPass, email: $email }
    ) {
      status
    }
  }
`;

export const adminGqlMutation = gql`
  mutation ($password: String!, $email: String!) {
    adminLogin(arg1: { password: $password, email: $email }) {
      status
      message
      accessToken
    }
  }
`;
export const InviteLoginMutation = gql`
  mutation ($email: String!, $code: String!) {
    inviteLogin(value: { code: $code, email: $email }) {
      accessToken
      message
      status
    }
  }
`;

export const remove_GuestMutation = gql`
  mutation ($id: Int!) {
    delete_invite_users_by_pk(id: $id) {
      email
    }
  }
`;

export const forgetCodeMutation = `mutation($email:String!,$code:String!)
{
update_users(where:{email:{_eq:$email}} _set:{forgetCode:$code})
  {
 affected_rows
  }
}`;
export const insertSkill = gql`
  mutation ($level: Int!, $name: String!, $user_id: uuid!) {
    insert_skills_one(
      object: { level: $level, name: $name, user_id: $user_id }
    ) {
      id
    }
  }
`;

export const resetPassword = ` mutation($password:String!,$email:String!)
{
  update_users(where:{email:{_eq:$email}} _set:{password:$password})
  {
    affected_rows
    
  }
  
}`;

export const resetAction = gql`
  mutation ($email: String!, $password: String!) {
    resetPassword(value: { email: $email, password: $password }) {
      email
      status
    }
  }
`;

export const deleteSkill = gql`
  mutation deleteByID($id: Int!) {
    delete_skills_by_pk(id: $id) {
      id
    }
  }
`;

export const updateSkillById = gql`
  mutation ($id: Int!, $name: String!, $level: Int!) {
    update_skills_by_pk(
      pk_columns: { id: $id }
      _set: { level: $level, name: $name }
    ) {
      id
    }
  }
`;

export const addExperience = gql`
  mutation (
    $user_id: uuid!
    $name: String!
    $description: String!
    $start_date: date!
    $end_date: date
    $position: String!
  ) {
    insert_experiences_one(
      object: {
        description: $description
        name: $name
        user_id: $user_id
        start_date: $start_date
        end_date: $end_date
        position: $position
      }
    ) {
      id
    }
  }
`;
export const updateExperience = gql`
  mutation (
    $id: Int!
    $name: String!
    $description: String!
    $start_date: date!
    $end_date: date
    $position: String!
  ) {
    update_experiences_by_pk(
      pk_columns: { id: $id }
      _set: {
        description: $description
        name: $name
        start_date: $start_date
        end_date: $end_date
        position: $position
      }
    ) {
      id
    }
  }
`;
export const deleteExperience = gql`
  mutation ($id: Int!) {
    delete_experiences_by_pk(id: $id) {
      id
    }
  }
`;

export const addEducation = gql`
  mutation (
    $user_id: uuid
    $name: String!
    $description: String!
    $education_level: String!
    $start_date: date!
    $end_date: date
  ) {
    insert_educations_one(
      object: {
        description: $description
        name: $name
        user_id: $user_id
        education_level: $education_level
        start_date: $start_date
        end_date: $end_date
      }
    ) {
      id
    }
  }
`;

export const updateEducation = gql`
  mutation (
    $id: Int!
    $name: String!
    $description: String!
    $education_level: String!
    $start_date: date!
    $end_date: date
  ) {
    update_educations_by_pk(
      pk_columns: { id: $id }
      _set: {
        description: $description
        name: $name
        education_level: $education_level
        start_date: $start_date
        end_date: $end_date
      }
    ) {
      id
    }
  }
`;

export const deleteEducation = gql`
  mutation ($id: Int!) {
    delete_educations_by_pk(id: $id) {
      id
    }
  }
`;

export const uploadImageQuery = gql`
  mutation ($name: String!, $base64: String!) {
    upLoadImage(value: { base64: $base64, name: $name }) {
      url
      error
    }
  }
`;
export const addProject = gql`
  mutation (
    $title: String!
    $description: String!
    $image: String!
    $date: String!
    $size: Int!
    $link: String!
    $user_id: uuid
  ) {
    insert_projects_one(
      object: {
        date: $date
        description: $description
        image: $image
        link: $link
        title: $title
        size: $size
        user_id: $user_id
      }
    ) {
      date
      id
      image
      size
      title
    }
  }
`;
export const updateProject = gql`
  mutation (
    $title: String!
    $description: String!
    $image: String!
    $date: String!
    $size: Int!
    $link: String!
    $id: Int!
  ) {
    update_projects_by_pk(
      pk_columns: { id: $id }
      _set: {
        date: $date
        description: $description
        image: $image
        link: $link
        size: $size
        title: $title
      }
    ) {
      id
    }
  }
`;
export const deleteProject = gql`
  mutation ($id: Int!) {
    delete_projects_by_pk(id: $id) {
      id
    }
  }
`;
export const addService = gql`
  mutation (
    $description: String!
    $title: String!
    $image: String!
    $year: Int
    $cleint: Int
    $user_id: uuid!
  ) {
    insert_services_one(
      object: {
        description: $description
        title: $title
        image: $image
        year: $year
        satisfied_cleint: $cleint
        user_id: $user_id
      }
    ) {
      id
    }
  }
`;
export const updateService = gql`
  mutation (
    $description: String!
    $title: String!
    $image: String!
    $year: Int
    $cleint: Int
    $id: Int!
  ) {
    update_services_by_pk(
      pk_columns: { id: $id }
      _set: {
        description: $description
        year: $year
        image: $image
        satisfied_cleint: $cleint
        title: $title
      }
    ) {
      id
    }
  }
`;

export const deleteService = gql`
  mutation ($id: Int!) {
    delete_services_by_pk(id: $id) {
      id
    }
  }
`;

export const updateAdminByUsers = gql`
  mutation (
    $id: uuid!
    $About: String!
    $email: String!
    $Fname: String
    $Lname: String!
    $phone: String!
    $status: String!
    $address: String!
    $image: String!
  ) {
    update_users_by_pk(
      pk_columns: { id: $id }
      _set: {
        about: $About
        email: $email
        first_name: $Fname
        last_name: $Lname
        phone: $phone
        status: $status
        address: $address
        profile_image: $image
      }
    ) {
      id
    }
  }
`;
