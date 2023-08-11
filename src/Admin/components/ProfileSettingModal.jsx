import React, { useState, useEffect } from "react";
import { Modal, Button, Form, Spinner } from "react-bootstrap";
import { storage } from "../utils/FirebaseConfig.js";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import axios from "axios";

const API_URL = "https://victorious-lion-clothes.cyclic.cloud/api/profile";

const ProfileSettingsModal = ({ show, handleClose, user }) => {
  const [userData, setUserData] = useState(null);
  const [isEditMode, setIsEditMode] = useState(false);
  const [selectedPhoto, setSelectedPhoto] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    fetchProfile();
  }, []);

  const headers = {
    headers: {
      Authorization: `Bearer ${user?.token}`,
    },
  };
  const fetchProfile = async () => {
    try {
      const response = await axios.get(API_URL, headers);

      if (response.status === 200) {
        setUserData(response.data.user);
      }
    } catch (error) {
      console.error("Error fetching profile:", error);
    } finally {
      setIsEditMode(false);
      setIsLoading(false);
    }
  };

  const handlePhotoChange = (event) => {
    setSelectedPhoto(event.target.files[0]);
  };

  const uploadPhoto = async () => {
    if (!selectedPhoto) return;

    setIsLoading(true);
    const storageRef = ref(storage, `images/user/${selectedPhoto.name}`);

    try {
      const snapshot = await uploadBytes(storageRef, selectedPhoto);
      const url = await getDownloadURL(snapshot.ref);
      await updateProfileImage(url);
    } catch (error) {
      console.error("Error uploading photo:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const updateProfileImage = async (url) => {
    try {
      await axios.patch(API_URL, { userImage: url }, headers);
      fetchProfile();
    } catch (error) {
      console.error("Error updating profile image:", error);
    }
  };

  const closeModal = () => {
    setIsEditMode(false);
    setSelectedPhoto(null);
    handleClose();
  };

  const { username, email, userImage } = userData || {};

  return (
    <Modal
      show={show}
      onHide={closeModal}
      centered
      bg="dark"
      data-bs-theme="dark"
      dialogClassName="custom-modal"
    >
      <Modal.Header closeButton>
        <Modal.Title>Edit Profile Settings</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        {isLoading ? (
          <Spinner animation="border" />
        ) : (
          <Form>
            <Form.Group>
              <Form.Label>Profile Image</Form.Label>
              <div className="d-flex flex-column align-items-center">
                <div className="d-flex flex-column">
                  <img
                    src={
                      selectedPhoto?.name
                        ? URL.createObjectURL(selectedPhoto)
                        : userImage
                    }
                    alt="Profile"
                    width={190}
                    height={190}
                    className="profile-image"
                  />
                  {isEditMode ? (
                    <Form.Group controlId="formFile" className="mb-3">
                      <Form.Label>Choose an image</Form.Label>
                      <Form.Control type="file" onChange={handlePhotoChange} />
                    </Form.Group>
                  ) : (
                    <Button
                      variant="outline-secondary"
                      onClick={() => setIsEditMode(true)}
                    >
                      Edit Photo
                    </Button>
                  )}
                </div>
              </div>
            </Form.Group>
            <Form.Group>
              <Form.Label>Username</Form.Label>
              <Form.Control type="text" value={username} disabled />
            </Form.Group>
            <Form.Group>
              <Form.Label>Email</Form.Label>
              <Form.Control type="email" value={email} disabled />
            </Form.Group>
          </Form>
        )}
      </Modal.Body>
      <Modal.Footer>
        <Button variant="outline-secondary" onClick={closeModal}>
          Cancel
        </Button>
        {isEditMode && (
          <Button variant="primary" onClick={uploadPhoto} disabled={isLoading}>
            Save Changes
          </Button>
        )}
      </Modal.Footer>
    </Modal>
  );
};

export default ProfileSettingsModal;
