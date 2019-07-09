import { Ionicons } from '@expo/vector-icons';

export default function(type) {
  if(type === 'add') return (<Ionicons name="md-add-circle" size={32} color="#eee" />)
  if(type === 'delete') return (<Ionicons name="md-remove-circle" size={32} color="#eee" />)
  return null;
}