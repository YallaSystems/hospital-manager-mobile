import React from 'react';
import { Modal, View, Text, StyleSheet, Button } from 'react-native';

interface MaintenanceModalProps {
  visible: boolean;
  onRetry: () => void;
  title: string;
  message: string;
  retryButtonText: string;
}

const MaintenanceModal: React.FC<MaintenanceModalProps> = ({
  visible,
  onRetry,
  title,
  message,
  retryButtonText,
}) => (
  <Modal
    visible={visible}
    transparent={true}
    animationType="fade"
    onRequestClose={() => {}}
  >
    <View style={styles.modalOverlay}>
      <View style={styles.modalContent}>
        <Text style={styles.modalTitle}>{title}</Text>
        <Text style={styles.modalText}>{message}</Text>
        <View style={{ marginTop: 14, width: '100%' }}>
          <Button title={retryButtonText} onPress={onRetry} />
        </View>
      </View>
    </View>
  </Modal>
);

const styles = StyleSheet.create({
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContent: {
    backgroundColor: 'white',
    padding: 32,
    borderRadius: 16,
    alignItems: 'center',
    maxWidth: '80%',
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 12,
    textAlign: 'center',
  },
  modalText: {
    fontSize: 16,
    textAlign: 'center',
  },
});

export default MaintenanceModal; 