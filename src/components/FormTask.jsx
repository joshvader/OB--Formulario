import React from 'react'
import { Formik, Field, Form } from 'formik';
import * as Yup from 'yup';

import useList from '../hooks/useList';
import LEVELS from '../models/levels.enum';

const FormTask = () => {
    const TaskSchema = Yup.object().shape({
        name: Yup.string().min(2, 'Too Short!').max(50, 'Too Long!').required('Required'),
        description: Yup.string().min(2, 'Too Short!').max(100, 'Too Long!').required('Required'),
      });
      const defaultTask = {
        name: 'Formik',
        description: 'Formulario con Formik',
        level: LEVELS.URGENT,
        done: false,
      };
      const tasks = useList([defaultTask]);
    
  return (
    <div>
<h1>Lista de Tareas</h1>
      <Formik
        initialValues={{
          name: '',
          description: '',
          level: LEVELS.NORMAL,
          done: false,
        }}
        onSubmit={(values, actions) => {
          setTimeout(() => {
            tasks.push(values);
            actions.resetForm({});
            actions.setSubmitting(false);
          }, 500);
        }}
        validationSchema={TaskSchema}
      >
        {({ errors }) => (
          <Form>
            <Field className="input" name="name" placeholder="Nombre de la Tarea" />
            {errors && errors.name}
            <Field name="description" placeholder="Descripción de la Tarea" />
            {errors && errors.description}

            <Field  className="input" as="select" name="level">
              <option value={LEVELS.NORMAL}>Normal</option>
              <option value={LEVELS.URGENT}>Urgent</option>
              <option value={LEVELS.BLOCKING}>Blocking</option>
            </Field>
            <button type="submit">Añadir</button>
          </Form>
        )}
      </Formik>
      {tasks.isEmpty() ? (
        <p>Task List is Empty</p>
      ) : (
        tasks.value.map((task, index) => (
          <li key={index} style={{ display: 'flex', alignItems: 'center' }}>
            <input type="checkbox" onClick={() => tasks.remove(index)} checked={false} />
            <p style={{ fontWeight: 'bold', marginRight: '15px' }}>{task.name}</p>
            <p>{task.description}</p>
          </li>
        ))
      )}
    </div>
  )
}

export default FormTask