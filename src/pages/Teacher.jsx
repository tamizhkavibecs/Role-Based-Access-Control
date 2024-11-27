import React, { useState, useEffect } from "react";
import axios from "axios";
import { Button, Modal, Form } from "react-bootstrap";
import CustomNavbar from "../Components/Navbar";
const Teacher = () => {
  const [teachers, setTeachers] = useState([]);
  const [currentTeacher, setCurrentTeacher] = useState({
    name: "",
    email: "",
  });
  const [editMode, setEditMode] = useState(false);
  const [addMode, setAddMode] = useState(false); // For Add Modal
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [selectedTeacherId, setSelectedTeacherId] = useState(null);
  const [errors, setErrors] = useState({});

  // Fetch teachers on component mount
  useEffect(() => {
    axios
      .get("http://localhost:3000/teachers")
      .then((res) => setTeachers(res.data))
      .catch((err) => console.error("Error fetching teachers:", err));
  }, []);

  // Form validation
  const validateTeacher = () => {
    const newErrors = {};
    if (!currentTeacher.name.trim()) newErrors.name = "Name is required";
    if (
      !currentTeacher.email.trim() ||
      !/\S+@\S+\.\S+/.test(currentTeacher.email)
    )
      newErrors.email = "Valid email is required";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // Handle save after edit
  const handleSaveTeacher = () => {
    if (!validateTeacher()) return;

    if (editMode) {
      // Update existing teacher
      axios
        .put(
          `http://localhost:3000/teachers/${currentTeacher.id}`,
          currentTeacher
        )
        .then(() => {
          setTeachers((prev) =>
            prev.map((teacher) =>
              teacher.id === currentTeacher.id ? currentTeacher : teacher
            )
          );
          setEditMode(false);
        })
        .catch((err) => console.error("Error updating teacher:", err));
    } else if (addMode) {
      // Add new teacher
      axios
        .post("http://localhost:3000/teachers", currentTeacher)
        .then((res) => {
          setTeachers((prev) => [...prev, res.data]);
          setAddMode(false);
        })
        .catch((err) => console.error("Error adding teacher:", err));
    }
    setCurrentTeacher({ name: "", email: "" });
  };

  // Handle delete confirmation
  const handleDeleteTeacher = () => {
    axios
      .delete(`http://localhost:3000/teachers/${selectedTeacherId}`)
      .then(() => {
        setTeachers((prev) =>
          prev.filter((teacher) => teacher.id !== selectedTeacherId)
        );
        setShowDeleteModal(false);
      })
      .catch((err) => console.error("Error deleting teacher:", err));
  };

  const role = localStorage.getItem("role");
  // console.log("user", role);
  return (
    <div>
      {(role === "admin" || role === "teacher") && <CustomNavbar />}
      {/* Teachers Table */}
      <h3>Teacher Details</h3>
      <Button
        variant="success"
        onClick={() => {
          setAddMode(true);
          setCurrentTeacher({ name: "", email: "" });
        }}
      >
        Add Teacher
      </Button>
      <table className="table mt-3">
        <thead>
          <tr>
            <th>Name</th>
            <th>Email</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {teachers.map((teacher) => (
            <tr key={teacher.id}>
              <td>{teacher.name}</td>
              <td>{teacher.email}</td>
              <td>
                <Button
                  variant="warning"
                  size="sm"
                  onClick={() => {
                    setCurrentTeacher(teacher);
                    setEditMode(true);
                  }}
                >
                  Edit
                </Button>{" "}
                <Button
                  variant="danger"
                  size="sm"
                  onClick={() => {
                    setSelectedTeacherId(teacher.id);
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

      {/* Add/Edit Teacher Modal */}
      <Modal
        show={editMode || addMode}
        onHide={() => {
          setEditMode(false);
          setAddMode(false);
        }}
      >
        <Modal.Header closeButton>
          <Modal.Title>{editMode ? "Edit Teacher" : "Add Teacher"}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group>
              <Form.Label>Name</Form.Label>
              <Form.Control
                type="text"
                value={currentTeacher.name}
                onChange={(e) =>
                  setCurrentTeacher({ ...currentTeacher, name: e.target.value })
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
                value={currentTeacher.email}
                onChange={(e) =>
                  setCurrentTeacher({
                    ...currentTeacher,
                    email: e.target.value,
                  })
                }
                isInvalid={!!errors.email}
              />
              <Form.Control.Feedback type="invalid">
                {errors.email}
              </Form.Control.Feedback>
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button
            variant="secondary"
            onClick={() => {
              setEditMode(false);
              setAddMode(false);
            }}
          >
            Cancel
          </Button>
          <Button variant="primary" onClick={handleSaveTeacher}>
            Save
          </Button>
        </Modal.Footer>
      </Modal>

      {/* Delete Confirmation Modal */}
      <Modal show={showDeleteModal} onHide={() => setShowDeleteModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Confirm Delete</Modal.Title>
        </Modal.Header>
        <Modal.Body>Are you sure you want to delete this teacher?</Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowDeleteModal(false)}>
            Cancel
          </Button>
          <Button variant="danger" onClick={handleDeleteTeacher}>
            Delete
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default Teacher;
