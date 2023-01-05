import { User } from "../components/user";

function UserList({ data }) {
  return (
    <div>
      <h1>Next.JS Pre-Rendering</h1>
      <div>
        {data.map((user) => {
          return <User key={user.id} user={user} />;
        })}
      </div>
    </div>
  );
}

export default UserList;

export async function getStaticProps() {
  const response = await fetch("https://jsonplaceholder.typicode.com/users");
  const users = await response.json();

  return {
    props: {
      data: users,
    },
  };
}
