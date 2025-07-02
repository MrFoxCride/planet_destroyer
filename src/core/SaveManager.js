export class SaveManager {
  static save(state) {
    try {
      localStorage.setItem('pd_save', JSON.stringify(state));
    } catch (e) {
      // ignore quota errors
    }
  }

  static load() {
    try {
      const raw = localStorage.getItem('pd_save');
      if (!raw) return null;
      const data = JSON.parse(raw);
      if (!Array.isArray(data.craftQueue)) data.craftQueue = [];
      return data;
    } catch (e) {
      return null;
    }
  }
}

