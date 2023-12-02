import { IStore } from '../../app.interface';

const FormInfo = ({ form }: { form: IStore }) => {
  return (
    <div className="form-info">
      <h3>Data from {form.from}</h3>
      <div>
        <b>Name:</b> {form.name}
      </div>
      <div>
        <b>Age:</b> {form.age}
      </div>
      <div>
        <b>Email:</b> {form.email}
      </div>
      <div>
        <b>Password:</b> {form.password}
      </div>
      <div>
        <b>Gender:</b> {form.gender}
      </div>
      <div>
        <b>Country:</b> {form.country}
      </div>
      <div>
        <b>Accepted terms:</b> {form.terms ? 'Yes' : 'No'}
      </div>
      <div>
        <b>Image Base64:</b> {form.image.slice(0, 30)} ...
      </div>
    </div>
  );
};

export default FormInfo;
