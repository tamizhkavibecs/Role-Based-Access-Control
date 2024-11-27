import React, { useState, useEffect } from "react";
import axios from "axios";
import { Button, Modal, Form } from "react-bootstrap";
import CustomNavbar from "../Components/Navbar";
const Student = () => {
  const [students, setStudents] = useState([]);
  const [currentStudent, setCurrentStudent] = useState({
    name: "",
    email: "",
    department: "",
  });
  const [editMode, setEditMode] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [showAddModal, setShowAddModal] = useState(false);
  const [selectedStudentId, setSelectedStudentId] = useState(null);
  const [errors, setErrors] = useState({});

  // Fetch students on component mount
  useEffect(() => {
    axios
      .get("http://localhost:3000/students")
      .then((res) => setStudents(res.data))
      .catch((err) => console.error("Error fetching students:", err));
  }, []);

  // Form validation
  const validateStudent = () => {
    const newErrors = {};
    if (!currentStudent.name.trim()) newErrors.name = "Name is required";
    if (
      !currentStudent.email.trim() ||
      !/\S+@\S+\.\S+/.test(currentStudent.email)
    )
      newErrors.email = "Valid email is required";
    if (!currentStudent.department.trim())
      newErrors.department = "Department is required";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // Handle save after edit
  const handleSaveStudent = () => {
    if (!validateStudent()) return;

    if (editMode) {
      // Update existing student
      axios
        .put(
          `http://localhost:3000/students/${currentStudent.id}`,
          currentStudent
        )
        .then(() => {
          setStudents((prev) =>
            prev.map((student) =>
              student.id === currentStudent.id ? currentStudent : student
            )
          );
          setEditMode(false);
        })
        .catch((err) => console.error("Error updating student:", err));
    }
  };

  // Handle add new student
  const handleAddStudent = () => {
    if (!validateStudent()) return;

    axios
      .post("http://localhost:3000/students", {
        ...currentStudent,
        id: Date.now(), // Generate a unique ID for the new student
      })
      .then((res) => {
        setStudents((prev) => [...prev, res.data]);
        setShowAddModal(false);
      })
      .catch((err) => console.error("Error adding student:", err));
  };

  // Handle delete confirmation
  const handleDeleteStudent = () => {
    axios
      .delete(`http://localhost:3000/students/${selectedStudentId}`)
      .then(() => {
        setStudents((prev) =>
          prev.filter((student) => student.id !== selectedStudentId)
        );
        setShowDeleteModal(false);
      })
      .catch((err) => console.error("Error deleting student:", err));
  };

  const role = localStorage.getItem("role");
  // console.log("user", role);
  return (
    <div>
      {(role === "admin" || role === "teacher") && <CustomNavbar />}
      {/* Add Student Button */}
      <Button
        variant="success"
        className="mb-3"
        onClick={() => {
          setCurrentStudent({ name: "", email: "", department: "" });
          setShowAddModal(true);
        }}
      >
        Add Student
      </Button>

      {/* Students Table */}
      <h2>Student Details</h2>
      <table className="table">
        <thead>
          <tr>
            <th>Name</th>
            <th>Email</th>
            <th>Department</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {students.map((student) => (
            <tr key={student.id}>
              <td>{student.name}</td>
              <td>{student.email}</td>
              <td>{student.department}</td>
              <td>
                <Button
                  variant="warning"
                  size="sm"
                  onClick={() => {
                    setCurrentStudent(student);
                    setEditMode(true);
                  }}
                >
                  Edit
                </Button>{" "}
                <Button
                  variant="danger"
                  size="sm"
                  onClick={() => {
                    setSelectedStudentId(student.id);
                    setShowDeleteModal(true);
                  }}
                >
                  Delete
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Add Student Modal */}
      <Modal show={showAddModal} onHide={() => setShowAddModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Add Student</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group>
              <Form.Label>Name</Form.Label>
              <Form.Control
                type="text"
                value={currentStudent.name}
                onChange={(e) =>
                  setCurrentStudent({ ...currentStudent, name: e.target.value })
                }
                isInvalid={!!errors.name}
              />
              <Form.Control.Feedback type="invalid">
                {errors.name}
              </Form.Control.Feedback>
            </Form.Group>
            <Form.Group>
              <Form.Label>Email</Form.Label>
              <Form.Control
                type="email"
                value={currentStudent.email}
                onChange={(e) =>
                  setCurrentStudent({
                    ...currentStudent,
                    email: e.target.value,
                  })
                }
                isInvalid={!!errors.email}
              />
              <Form.Control.Feedback type="invalid">
                {errors.email}
              </Form.Control.Feedback>
            </Form.Group>
            <Form.Group>
              <Form.Label>Department</Form.Label>
              <Form.Control
                type="text"
                value={currentStudent.department}
                onChange={(e) =>
                  setCurrentStudent({
                    ...currentStudent,
                    department: e.target.value,
                  })
                }
                isInvalid={!!errors.department}
              />
              <Form.Control.Feedback type="invalid">
                {errors.department}
              </Form.Control.Feedback>
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowAddModal(false)}>
            Cancel
          </Button>
          <Button variant="primary" onClick={handleAddStudent}>
            Add
          </Button>
        </Modal.Footer>
      </Modal>

      {/* Edit Student Modal */}
      <Modal show={editMode} onHide={() => setEditMode(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Edit Student</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group>
              <Form.Label>Name</Form.Label>
              <Form.Control
                type="text"
                value={currentStudent.name}
                onChange={(e) =>
                  setCurrentStudent({ ...currentStudent, name: e.target.value })
                }
                isInvalid={!!errors.name}
              />
              <Form.Control.Feedback type="invalid">
                {errors.name}
              </Form.Control.Feedback>
            </Form.Group>
            <Form.Group>
              <Form.Label>Email</Form.Label>
              <Form.Control
                type="email"
                value={currentStudent.email}
                onChange={(e) =>
                  setCurrentStudent({
                    ...currentStudent,
                    email: e.target.value,
                  })
                }
                isInvalid={!!errors.email}
              />
              <Form.Control.Feedback type="invalid">
                {errors.email}
              </Form.Control.Feedback>
            </Form.Group>
            <Form.Group>
              <Form.Label>Department</Form.Label>
              <Form.Control
                type="text"
                value={currentStudent.department}
                onChange={(e) =>
                  setCurrentStudent({
                    ...currentStudent,
                    department: e.target.value,
                  })
                }
                isInvalid={!!errors.department}
              />
              <Form.Control.Feedback type="invalid">
                {errors.department}
              </Form.Control.Feedback>
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setEditMode(false)}>
            Cancel
          </Button>
          <Button variant="primary" onClick={handleSaveStudent}>
            Save
          </Button>
        </Modal.Footer>
      </Modal>

      {/* Delete Confirmation Modal */}
      <Modal show={showDeleteModal} onHide={() => setShowDeleteModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Confirm Delete</Modal.Title>
        </Modal.Header>
        <Modal.Body>Are you sure you want to delete this student?</Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowDeleteModal(false)}>
            Cancel
          </Button>
          <Button variant="danger" onClick={handleDeleteStudent}>
            Delete
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default Student;
